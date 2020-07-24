import React, { useMemo, useCallback } from 'react';

import { useMyInterestShare, PledgeHashData, InterestShareData } from 'features/stake';
import { PercentAmount } from 'model/entities';
import { Loading, FormattedAmount, DoubleLineCell } from 'components';
import { calcMyAPY } from 'domainLogic';

type OwnProps = {
  loanAPR: PercentAmount;
};

type Props = OwnProps & PledgeHashData & InterestShareData;

export function MyAPYCell({ loanAPR, supporter, borrower, proposalId, initialLoanSize }: Props) {
  const pledgeHashData = { supporter, borrower, proposalId };
  const [interestShare, interestShareMeta] = useMyInterestShare({
    initialLoanSize,
    ...pledgeHashData,
  });

  const myAPY = useMemo(() => (interestShare ? calcMyAPY(interestShare, loanAPR) : null), [
    loanAPR,
    interestShare,
  ]);

  const renderTopPart = useCallback(
    () => <>{myAPY !== null && <FormattedAmount sum={myAPY} variant="plain" />}</>,
    [myAPY],
  );

  const renderBottomPart = useCallback(() => <></>, []);

  return (
    <Loading meta={[interestShareMeta]}>
      <DoubleLineCell renderTopPart={renderTopPart} renderBottomPart={renderBottomPart} />
    </Loading>
  );
}
