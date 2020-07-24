import React, { useCallback } from 'react';

import { FormattedAmount, DoubleLineCell, Label, Loading } from 'components';
import { Status } from 'generated/gql/pool';

import { useMyInterestShare } from './useMyInterestShare';
import { useMyStakeCost } from './useMyStakeCost';

interface Props {
  supporter: string;
  borrower: string;
  proposalId: string;
  status: Status;
  loanBody: string;
  initialLoanSize: string;
  children?: React.ReactNode;
}

export function MyStakeCost({
  supporter,
  borrower,
  proposalId,
  loanBody,
  status,
  initialLoanSize,
  children,
}: Props) {
  const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';
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
