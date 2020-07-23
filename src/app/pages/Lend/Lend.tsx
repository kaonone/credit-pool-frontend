import * as React from 'react';

import { Loading } from 'components';
import { useLoanProposalsQuery, LoanProposalsQueryResult } from 'generated/gql/pool';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { LiquidityAmount, PercentAmount, Currency } from 'model/entities';

import { LoanProposalsTable, LoanProposal } from './views/LoanProposalsTable/LoanProposalsTable';

function convertLoanProposals(
  result: LoanProposalsQueryResult,
  liquidityCurrency: Currency | undefined,
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
      })) || []
    : [];
}

export function Lend() {
  const { result, paginationView } = useSubgraphPagination(useLoanProposalsQuery, {});

  const api = useApi();
  const [liquidityCurrency, liquidityTokenMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [api],
  );
  const loanProposals: LoanProposal[] = React.useMemo(
    () => convertLoanProposals(result, liquidityCurrency),
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
