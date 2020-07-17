import * as React from 'react';
import cn from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';

import { NETWORK_ID } from 'env';
import { useCommunication } from 'utils/react';
import { ButtonBase, Loading, Typography, Box, ShortAddress, Grid, Button } from 'components';
import { WalletType } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
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

  const { t } = useTranslate();

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
      <Grid container direction="column" alignItems="center" className={classes.container}>
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
              <Typography className={classes.description}>{`${t(
                tKeys.features.auth.modalTitle.connectedTo.getKey(),
              )} ${t(tKeys.features.networkWarning.networkType[NETWORK_ID].getKey())}`}</Typography>
            </Grid>
            <Box clone alignSelf="stretch">
              <Grid item>
                <Button className={classes.actionName} variant="outlined">
                  {t(tKeys.features.auth.modalTitle.disconnect.getKey())}
                </Button>
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
    alignItems: 'flex-start',
    padding: theme.spacing(1),
    transition: theme.transitions.create(['background-color']),
    borderRadius: 12,
    minHeight: 171,

    '&:hover, &$focusVisible': {
      backgroundColor:
        theme.palette.type === 'dark'
          ? lighten(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.2),
    },
  },

  focusVisible: {},

  fullWidth: {
    width: '100%',
  },

  actionName: {
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
    fontSize: 12,
    marginBottom: 10,
  },

  title: {
    lineHeight: 1,
    marginTop: 20,
  },

  icon: {
    fontSize: 56,
  },

  container: {
    width: 'auto',
  },
}));
