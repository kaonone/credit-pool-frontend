import * as React from 'react';
import cn from 'classnames';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useCommunication } from 'utils/react';
import { ButtonBase, Loading, Typography, Box, ShortAddress, Grid } from 'components';
import { WalletType } from 'services/api';
import { makeStyles, Theme, colors } from 'utils/styles';
import { zeroAddress } from 'utils/mock';
import { Bitski, Fortmatic, Metamask, Portis, WalletConnect } from 'components/icons/wallets';

interface ProviderButtonProps {
  fullWidth?: boolean;
  connect(wallet: WalletType): Promise<void>;
  disconnect(): void;
  type: WalletType;
  connectedAddress: string | null;
}

const iconByWallet: Record<WalletType, typeof SvgIcon> = {
  bitski: Bitski,
  fortmatic: Fortmatic,
  metamask: Metamask,
  portis: Portis,
  connectWallet: WalletConnect,
};

export function ProviderButton({
  type,
  connect,
  connectedAddress,
  disconnect,
  fullWidth,
}: ProviderButtonProps) {
  const classes = useStyles();
  const connecting = useCommunication(connect, [connect]);
  const Icon = iconByWallet[type];

  const handleClick = React.useCallback(
    () => (connectedAddress ? disconnect() : connecting.execute(type)),
    [disconnect, connecting.execute, type, connectedAddress],
  );

  return (
    <ButtonBase
      focusRipple
      className={cn(classes.root, { [classes.fullWidth]: fullWidth })}
      color="primary"
      onClick={handleClick}
      focusVisibleClassName={classes.focusVisible}
    >
      <Grid container spacing={1} direction="column" alignItems="center">
        <Box clone alignSelf="stretch">
          <Grid item>
            {connectedAddress ? (
              <span className={classes.address}>
                <Address address={connectedAddress} />
              </span>
            ) : (
              <div className={classes.loading}>
                <span className={classes.hiddenAddress}>
                  <Address address={zeroAddress} />
                </span>
                <Loading communication={connecting} ignoreError />
              </div>
            )}
          </Grid>
        </Box>
        <Grid item>
          <Icon className={classes.icon} />
        </Grid>
        <Grid item>
          <Typography>{type}</Typography>
        </Grid>
        <Box clone alignSelf="stretch">
          <Grid item>
            <span className={classes.actionName}>
              {connectedAddress ? 'Disconnect' : 'Connect'}
            </span>
          </Grid>
        </Box>
      </Grid>
    </ButtonBase>
  );
}

function Address({ address }: { address: string }) {
  return (
    <Grid container spacing={1} wrap="nowrap" alignItems="center">
      <Grid item>
        <Grid container>
          <CheckCircleRoundedIcon />
        </Grid>
      </Grid>
      <Grid item>
        <ShortAddress disableCopy address={address} />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: theme.spacing(1.5),

    '&:hover, &$focusVisible': {
      backgroundColor: theme.palette.grey[100],
      border: `1px solid ${theme.palette.grey[400]}`,
      '& $actionName': {
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    },
  },

  focusVisible: {},

  fullWidth: {
    width: '100%',
  },

  actionName: {
    width: '100%',
    padding: theme.spacing(0.5, 2),
    height: theme.spacing(5),
    borderRadius: theme.spacing(2.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.grey[500]}`,
    textTransform: 'uppercase',
  },

  loading: {
    display: 'flex',
    alignItems: 'center',
  },

  hiddenAddress: {
    display: 'inline-block',
    overflow: 'hidden',
    width: 0,
  },

  address: {
    color: colors.fruitSalad,
    fontWeight: 'bold',
  },

  icon: {
    fontSize: theme.spacing(10),
  },
}));
