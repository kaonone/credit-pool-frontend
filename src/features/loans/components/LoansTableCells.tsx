import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { ShortAddress, Loading, FormattedBalance } from 'components';
import { getPledgeId } from 'model/getPledgeId';
import { usePledgeSubscription } from 'generated/gql/pool';

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
}

export function MyStakeCell({ supporter, borrower, proposalId }: MyStakeCellProps) {
  const pledgeHash = React.useMemo(() => getPledgeId(supporter, borrower, proposalId), [
    supporter,
    borrower,
    proposalId,
  ]);

  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const myStake = pledgeGqlResult.data?.pledge?.lLocked || '0';

  return (
    <Loading gqlResults={pledgeGqlResult}>
      <FormattedBalance sum={myStake} token="dai" />
    </Loading>
  );
}

export function MyEarnCell({ supporter, borrower, proposalId }: MyStakeCellProps) {
  const pledgeHash = React.useMemo(() => getPledgeId(supporter, borrower, proposalId), [
    supporter,
    borrower,
    proposalId,
  ]);

  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const myEarn = pledgeGqlResult.data?.pledge?.lInterest || '0';

  return (
    <Loading gqlResults={pledgeGqlResult}>
      <FormattedBalance sum={myEarn} token="dai" />
    </Loading>
  );
}
