import * as React from 'react';

import { useLoanProposalsQuery } from 'generated/gql/pool';
import { useSubgraphPagination } from 'utils/react';

import { LoanProposalsTable, LoanProposal } from './views/LoanProposalsTable/LoanProposalsTable';

export function Lend() {
  const { result, paginationView } = useSubgraphPagination(useLoanProposalsQuery, {});
  const debts = result.data?.debts;

  const loanProposals: LoanProposal[] = React.useMemo(
    () =>
      debts?.map<LoanProposal>(debt => ({
        borrower: debt.borrower.id,
        loanRequested: debt.total,
        loanAPY: debt.apr,
        loanDuration: '90 days',
        lStaked: debt.lStaked,
      })) || [],
    [debts],
  );

  return (
    <>
      <LoanProposalsTable loanProposals={loanProposals} />
      {paginationView}
    </>
  );
}
