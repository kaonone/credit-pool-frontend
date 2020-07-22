import React, { useCallback } from 'react';
import BN from 'bn.js';

import { useApi } from 'services/api';
import { Loading, FormattedAmount, DoubleLineCell, Label } from 'components';
import { calcInterestShare, getPledgeId } from 'model';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';
import { usePledgeSubscription, Status } from 'generated/gql/pool';

interface Props {
  supporter: string;
  borrower: string;
  proposalId: string;
  status: Status;
  loanBody: string;
  initialLoanSize: string;
}

export function MyStakeCost({
  supporter,
  borrower,
  proposalId,
  loanBody,
  status,
  initialLoanSize,
}: Props) {
  const pledgeHash = React.useMemo(() => getPledgeId(supporter, borrower, proposalId), [
    supporter,
    borrower,
    proposalId,
  ]);

  const api = useApi();
  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const pLocked = pledgeGqlResult.data?.pledge?.pLocked || '0';
  const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';

  const additionalLiquidity = status === Status.Proposed ? lInitialLocked : loanBody;

  const [myStakeCost, myStakeCostMeta] = useSubscribable(
    () => api.fundsModule.getAvailableBalanceIncreasing$(supporter, pLocked, additionalLiquidity),
    [supporter, pLocked, additionalLiquidity],
  );

  const [fullLoanStake, fullLoanStakeMeta] = useSubscribable(
    () => api.loanModule.calculateFullLoanStake$(initialLoanSize),
    [initialLoanSize],
  );
  const interestShareDecimals = 2;
  const interestShare =
    fullLoanStake && calcInterestShare(lInitialLocked, fullLoanStake, interestShareDecimals);

  const renderTopPart = useCallback(
    () => <>{myStakeCost && <FormattedAmount sum={myStakeCost} />}</>,
    [myStakeCost],
  );

  const renderBottomPart = useCallback(
    () => (
      <>
        {interestShare && (
          <Label hint="My collateral percent info" inline>
            {formatBalance({
              amountInBaseUnits: interestShare,
              baseDecimals: interestShareDecimals,
            })}
            %
          </Label>
        )}
      </>
    ),
    [interestShare, interestShareDecimals],
  );

  return (
    <Loading gqlResults={pledgeGqlResult} meta={[myStakeCostMeta, fullLoanStakeMeta]}>
      {new BN(pLocked).gtn(0) ? (
        <DoubleLineCell renderTopPart={renderTopPart} renderBottomPart={renderBottomPart} />
      ) : (
        '_'
      )}
    </Loading>
  );
}
