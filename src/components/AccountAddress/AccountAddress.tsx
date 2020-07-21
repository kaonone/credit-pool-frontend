import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import {} from 'components';
import { makeStyles } from 'utils/styles';

import { ShortAddress } from '../ShortAddress/ShortAddress';

type Props = { address: string; size: 'big' | 'small' };

export function AccountAddress(props: Props) {
  const { address } = props;
  const classes = useStyles(props);

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <Avatar classes={classes}>
          <Jazzicon diameter={40} seed={jsNumberForAddress(address)} />
        </Avatar>
      </Grid>
      <Grid item>
        <ShortAddress address={address} />
      </Grid>
    </Grid>
  );
}

AccountAddress.defaultProps = {
  size: 'big',
} as Partial<Props>;

const useStyles = makeStyles(
  () => ({
    root: {
      width: ({ size }: Props) => (size === 'small' ? 20 : 40),
      height: ({ size }: Props) => (size === 'small' ? 20 : 40),
    },
  }),
  { name: 'AccountAddress' },
);
