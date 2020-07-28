import * as React from 'react';

import { Loading } from 'components';
import { useLoanProposalsQuery, LoanProposalsQueryResult } from 'generated/gql/pool';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { LiquidityAmount, PercentAmount, Currency } from 'model/entities';

import { LoanProposalsTable, LoanProposal } from '../LoanProposalsTable/LoanProposalsTable';

type Props = {
  account: string;
};

function convertLoanProposals(
  result: LoanProposalsQueryResult,
  liquidityCurrency: Currency | undefined,
  account: string,
) {
  const debts = result.data?.debts;
  return liquidityCurrency
    ? debts?.map<LoanProposal>(debt => ({
        borrower: debt.borrower.id,
        loanRequested: new LiquidityAmount(debt.total, liquidityCurrency),
        loanAPY: new PercentAmount(debt.apr),
        loanDuration: '90 days',
        lStaked: new LiquidityAmount(debt.lStaked, liquidityCurrency),
        descriptionHash: debt.description,
        proposalId: debt.proposal_id,
        isOwnProposal: account.toLowerCase() === debt.borrower.id.toLowerCase(),
      })) || []
    : [];
}

export function LendContent(props: Props) {
  const { account } = props;
  const { result, paginationView } = useSubgraphPagination(useLoanProposalsQuery, {});

  const api = useApi();
  const [liquidityCurrency, liquidityTokenMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [api],
  );
  const loanProposals: LoanProposal[] = React.useMemo(
    () => convertLoanProposals(result, liquidityCurrency, account),
    [result, liquidityCurrency],
  );
  return (
    <>
      <Loading gqlResults={result} meta={liquidityTokenMeta}>
        <LoanProposalsTable loanProposals={loanProposals} />
        {paginationView}
      </Loading>
    </>
  );
}
