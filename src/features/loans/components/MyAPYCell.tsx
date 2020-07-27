import React, { useMemo } from 'react';

import { useMyInterestShare } from 'features/stake';
import { PercentAmount } from 'model/entities';
import { Loading, FormattedAmount } from 'components';
import { calcLoanAPY } from 'domainLogic';

import { PartialDebt } from './types';

type Props = {
  loanAPR: PercentAmount;
  account: string;
  debt: PartialDebt;
};

export function MyAPYCell({ loanAPR, account, debt }: Props) {
  const pledgeHashData = {
    supporter: account,
    borrower: debt.borrower.id,
    proposalId: debt.proposal_id,
  };

  const [interestShare, interestShareMeta] = useMyInterestShare({
    initialLoanSize: debt.total,
    ...pledgeHashData,
  });

  const myAPY = useMemo(() => (interestShare ? calcLoanAPY(interestShare, loanAPR) : null), [
    loanAPR,
    interestShare,
  ]);

  return (
    <Loading meta={[interestShareMeta]}>
      {myAPY !== null && <FormattedAmount sum={myAPY} variant="plain" />}
    </Loading>
  );
}
