import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import BN from 'bn.js';

import { ShortAddress, Loading } from 'components';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

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

export function EarnCell(props: { borrower: string; debt: BN; supporter: string }) {
  const { borrower, debt, supporter } = props;

  const api = useApi();
  const [stakeInfo, stakeInfoMeta] = useSubscribable(
    () => api.loanModule.getStakeInfo$(borrower, debt, supporter),
    [],
  );

  return (
    <Loading meta={stakeInfoMeta} progressVariant="circle">
      <FormattedBalance sum={stakeInfo?.earn || '0'} token="dai" />
    </Loading>
  );
}

export function MyStakeCell(props: { borrower: string; debt: BN; supporter: string }) {
  const { borrower, debt, supporter } = props;

  const api = useApi();
  const [stakeInfo, stakeInfoMeta] = useSubscribable(
    () => api.loanModule.getStakeInfo$(borrower, debt, supporter),
    [],
  );

  return (
    <Loading meta={stakeInfoMeta} progressVariant="circle">
      <FormattedBalance sum={stakeInfo?.myStake || '0'} token="dai" />
    </Loading>
  );
}
