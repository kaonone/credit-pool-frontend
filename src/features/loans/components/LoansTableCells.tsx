import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import BN from 'bn.js';

import { ShortAddress, Loading, FormattedBalance } from 'components';
import { getPledgeId } from 'model/getPledgeId';
import { usePledgeSubscription, Status } from 'generated/gql/pool';
import { calcInterestShare } from 'model';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { formatBalance } from 'utils/format';

export function AddressCell({ address }: { address: string }) {
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <Avatar>
          <Jazzicon diameter={40} seed={jsNumberForAddress(address)} />
        </Avatar>
      </Grid>
      <Grid item>
        <ShortAddress address={address} />
      </Grid>
    </Grid>
  );
}

interface MyStakeCellProps {
  supporter: string;
  borrower: string;
  proposalId: string;
  status: Status;
  loanBody: string;
}

export function MyStakeCell({
  supporter,
  borrower,
  proposalId,
  loanBody,
  status,
}: MyStakeCellProps) {
  const pledgeHash = React.useMemo(() => getPledgeId(supporter, borrower, proposalId), [
    supporter,
    borrower,
    proposalId,
  ]);

  const api = useApi();
  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const pLocked = pledgeGqlResult.data?.pledge?.pLocked || '0';
  // const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';

  const additionalLiquidity = status === Status.Proposed ? '0' : loanBody;
  // TODO uncomment after contracts updating
  // const additionalLiquidity = status === Status.Proposed ? lInitialLocked : loanBody;

  const [myStakeCost, myStakeCostMeta] = useSubscribable(
    () => api.fundsModule.getAvailableBalanceIncreasing$(supporter, pLocked, additionalLiquidity),
    [supporter, pLocked, additionalLiquidity],
    new BN(0),
  );

  return (
    <Loading gqlResults={pledgeGqlResult} meta={myStakeCostMeta}>
      <FormattedBalance sum={myStakeCost.toString()} token="dai" />
    </Loading>
  );
}

interface MyEarnCellProps {
  supporter: string;
  borrower: string;
  proposalId: string;
}

export function MyEarnCell({ supporter, borrower, proposalId }: MyEarnCellProps) {
  const pledgeHash = React.useMemo(() => getPledgeId(supporter, borrower, proposalId), [
    supporter,
    borrower,
    proposalId,
  ]);

  const api = useApi();

  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });
  const pInterest = pledgeGqlResult.data?.pledge?.pInterest || '0';

  const [interestCost, interestCostMeta] = useSubscribable(
    () => api.fundsModule.getAvailableBalanceIncreasing$(supporter, pInterest, '0'),
    [supporter, pInterest],
    new BN(0),
  );

  return (
    <Loading gqlResults={pledgeGqlResult} meta={interestCostMeta}>
      <FormattedBalance sum={interestCost} token="dai" />
    </Loading>
  );
}

interface MyInterestShareCellProps {
  initialLoanSize: string;
  supporter: string;
  borrower: string;
  proposalId: string;
}

export function MyInterestShareCell({
  supporter,
  borrower,
  proposalId,
  initialLoanSize,
}: MyInterestShareCellProps) {
  const api = useApi();
  const pledgeHash = React.useMemo(() => getPledgeId(supporter, borrower, proposalId), [
    supporter,
    borrower,
    proposalId,
  ]);

  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';

  const [fullLoanStake, fullLoanStakeMeta] = useSubscribable(
    () => api.loanModule.calculateFullLoanStake$(initialLoanSize),
    [initialLoanSize],
  );
  const interestShareDecimals = 2;
  const interestShare =
    fullLoanStake && calcInterestShare(lInitialLocked, fullLoanStake, interestShareDecimals);

  return (
    <Loading meta={fullLoanStakeMeta} gqlResults={pledgeGqlResult}>
      {interestShare &&
        formatBalance({
          amountInBaseUnits: interestShare,
          baseDecimals: interestShareDecimals,
        })}
      %
    </Loading>
  );
}
