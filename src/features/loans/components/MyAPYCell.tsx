import React, { useMemo, useCallback } from 'react';
import BN from 'bn.js';

import { useMyInterestShare, useMyStakeCost } from 'features/stake';
import { PercentAmount } from 'model/entities';
import { Loading, FormattedAmount, DoubleLineCell } from 'components';
import { calcLoanAPY, calcLoanProfit } from 'domainLogic';

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

  const [stakeCost, stakeCostMeta] = useMyStakeCost({
    status: debt.status,
    loanBody: new BN(debt.total).sub(new BN(debt.repayed)).toString(),
    ...pledgeHashData,
  });

  const myAPY = useMemo(() => (interestShare ? calcLoanAPY(interestShare, loanAPR) : null), [
    loanAPR,
    interestShare,
  ]);

  const myProfit = useMemo(() => (myAPY && stakeCost ? calcLoanProfit(myAPY, stakeCost) : null), [
    myAPY,
    stakeCost,
  ]);

  const renderTopPart = useCallback(
    () => <>{myAPY !== null && <FormattedAmount sum={myAPY} variant="plain" />}</>,
    [myAPY],
  );

  const renderBottomPart = useCallback(
    () => <>{myProfit !== null && <FormattedAmount sum={myProfit} variant="plain" />}</>,
    [myProfit],
  );

  return (
    <Loading meta={[interestShareMeta, stakeCostMeta]}>
      <DoubleLineCell renderTopPart={renderTopPart} renderBottomPart={renderBottomPart} />
    </Loading>
  );
}
