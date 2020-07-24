import React, { useCallback } from 'react';

import { FormattedAmount, DoubleLineCell, Label, Loading } from 'components';

import { useMyInterestShare, InterestShareData } from './useMyInterestShare';
import { useMyStakeCost, StakeCostData, PledgeHashData } from './useMyStakeCost';

interface OwnProps {
  children?: React.ReactNode;
}

type Props = InterestShareData & StakeCostData & PledgeHashData & OwnProps;

export function MyStakeCost({
  supporter,
  borrower,
  proposalId,
  loanBody,
  status,
  initialLoanSize,
  children,
}: Props) {
  const pledgeHashData = { supporter, borrower, proposalId };
  const [interestShare, interestShareMeta] = useMyInterestShare({
    initialLoanSize,
    ...pledgeHashData,
  });
  const [stakeCost, stakeCostMeta] = useMyStakeCost({ status, loanBody, ...pledgeHashData });

  const renderTopPart = useCallback(
    () => <>{stakeCost && <FormattedAmount sum={stakeCost} variant="plain" />}</>,
    [stakeCost],
  );

  const renderBottomPart = useCallback(
    () => (
      <>
        {children}
        {interestShare && (
          <Label hint="My collateral percent info" inline>
            <FormattedAmount sum={interestShare} variant="plain" />
          </Label>
        )}
      </>
    ),
    [interestShare],
  );

  return (
    <Loading meta={[stakeCostMeta, interestShareMeta]}>
      <DoubleLineCell renderTopPart={renderTopPart} renderBottomPart={renderBottomPart} />
    </Loading>
  );
}
