import * as React from 'react';
import cn from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useCommunication } from 'utils/react';
import { ButtonBase, Loading, Typography, Box, ShortAddress, Grid } from 'components';
import { WalletType } from 'services/api';
import { makeStyles, Theme, darken, lighten } from 'utils/styles';
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
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Icon className={classes.icon} />
        </Grid>
        <Grid item>
          <Typography className={classes.title}>
            {connectedAddress ? <Address address={connectedAddress} /> : type}
          </Typography>
        </Grid>
        {connectedAddress ? (
          <>
            <Grid item>
              <Typography className={classes.description}>Connected to {type}</Typography>
            </Grid>
            <Box clone alignSelf="stretch">
              <Grid item>
                <span className={classes.actionName}>Disconnect</span>
              </Grid>
            </Box>
          </>
        ) : (
          <div className={classes.loading}>
            <span className={classes.hiddenAddress}>
              <Address address={zeroAddress} />
            </span>
            <Loading communication={connecting} ignoreError />
          </div>
        )}
      </Grid>
    </ButtonBase>
  );
}

function Address({ address }: { address: string }) {
  return <ShortAddress disableCopy address={address} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    transition: theme.transitions.create(['background-color']),
  },

  focusVisible: {},

  fullWidth: {
    width: '100%',
  },

  actionName: {
    width: '100%',
    padding: theme.spacing(0.5, 6),
    height: theme.spacing(4),
    borderRadius: theme.spacing(2.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${
      theme.palette.type === 'dark'
        ? lighten(theme.palette.background.paper, 0.2)
        : darken(theme.palette.background.paper, 0.2)
    }`,
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

  description: {
    opacity: 0.5,
    fontSize: theme.spacing(1.5),
    marginBottom: theme.spacing(1.2),
  },

  title: {
    lineHeight: 1,
    marginTop: theme.spacing(2.5),
  },

  icon: {
    fontSize: theme.spacing(7),
  },
}));
