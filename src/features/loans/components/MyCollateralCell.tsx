import React from 'react';
import BN from 'bn.js';

import { MyStakeCost } from 'features/stake';
import { CollateralContent } from 'app/pages/Lend/views/LoanProposalsTable/LoanProposalsTable';
import { Status } from 'generated/gql/pool';

import { EmptyCell } from './EmptyCell';
import { PartialDebt } from './types';

type Props = {
  account: string;
  debt: PartialDebt;
};

export function MyCollateralCell({
  account,
  debt,
  lStaked,
  loanRequested,
}: Props & React.ComponentProps<typeof CollateralContent>) {
  if (!account) {
    return <EmptyCell />;
  }

  return (
    <MyStakeCost
      supporter={account!}
      borrower={debt.borrower.id}
      proposalId={debt.proposal_id}
      status={debt.status}
      initialLoanSize={debt.total}
      loanBody={new BN(debt.total).sub(new BN(debt.repayed)).toString()}
      children={
        debt.status === Status.Proposed && (
          <CollateralContent lStaked={lStaked} loanRequested={loanRequested} hideLabel />
        )
      }
    />
  );
}
