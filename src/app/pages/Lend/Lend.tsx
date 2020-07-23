import * as React from 'react';

import { Loading } from 'components';
import { useLoanProposalsQuery } from 'generated/gql/pool';
import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { LiquidityAmount } from 'model/entities';

import { LoanProposalsTable, LoanProposal } from './views/LoanProposalsTable/LoanProposalsTable';

export function Lend() {
  const { result, paginationView } = useSubgraphPagination(useLoanProposalsQuery, {});
  const debts = result.data?.debts;

  const api = useApi();
  const [liquidityCurrency, liquidityTokenMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [api],
  );
  const loanProposals: LoanProposal[] = React.useMemo(
    () =>
      debts?.map<LoanProposal>(debt => ({
        borrower: debt.borrower.id,
        loanRequested: liquidityCurrency
          ? new LiquidityAmount(debt.total, liquidityCurrency)
          : undefined,
        rawLoanRequested: debt.total,
        loanAPY: debt.apr,
        loanDuration: '90 days',
        lStaked: debt.lStaked,
        descriptionHash: debt.description,
      })) || [],
    [debts],
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
