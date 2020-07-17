import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { CommunicationState } from 'utils/react';
import { Dialog, DialogTitle, DialogContent, Hint, Grid } from 'components';
import { WalletType, wallets } from 'services/api';
import { makeStyles } from 'utils/styles';
import { tKeys, useTranslate } from 'services/i18n';

import { ProviderButton } from './ProviderButton';

interface AuthModalProps {
  isOpened: boolean;
  connecting: CommunicationState<any, any>;
  account: string | null;
  connectedWallet: WalletType | null;
  onClose(): void;
  connect(wallet: WalletType): Promise<void>;
  disconnect(): void;
}

export function AuthModal(props: AuthModalProps) {
  const { isOpened, onClose, connecting, connect, account, disconnect, connectedWallet } = props;
  const isLogged: boolean = !!account && !!connectedWallet;

  const classes = useStyles();

  const { t } = useTranslate();
  const { modalTitle } = tKeys.features.auth;

  return (
    // tabIndex needed for Fortmatic form. Without tabIndex, form input cannot be taken into focus
    <Dialog
      classes={{ paper: classes.root }}
      open={isOpened}
      onClose={onClose}
      TransitionProps={{ tabIndex: 'unset' } as any}
    >
      <DialogTitle>
        {isLogged ? t(modalTitle.connected.getKey()) : t(modalTitle.disconnected.getKey())}
      </DialogTitle>
      <CloseIcon className={classes.closeButton} onClick={onClose} />
      <DialogContent className={classes.content}>
        <Grid container spacing={1} justify="center">
          {wallets.map((type, index) => (
            <Grid item xs={4} key={index}>
              <ProviderButton
                fullWidth
                connect={connect}
                disconnect={disconnect}
                type={type}
                connectedAddress={type === connectedWallet ? account : null}
                key={type}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      {connecting.error && (
        <DialogContent>
          <Hint color="error">{connecting.error}</Hint>
        </DialogContent>
      )}
    </Dialog>
  );
}

const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    opacity: 0.5,
    cursor: 'pointer',
  },
  content: {
    marginTop: 30,
  },
});
