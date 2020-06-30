import * as React from 'react';

import { CommunicationState } from 'utils/react';
import { Dialog, DialogTitle, DialogContent, Hint, Typography, Grid } from 'components';
import { WalletType, wallets } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ETH_NETWORK_CONFIG } from 'env';

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

const tKeys = tKeysAll.features.auth;

export function AuthModal(props: AuthModalProps) {
  const { isOpened, onClose, connecting, connect, account, disconnect, connectedWallet } = props;
  const { t } = useTranslate();
  const isLogged: boolean = !!account && !!connectedWallet;

  return (
    // tabIndex needed for Fortmatic form. Without tabIndex, form input cannot be taken into focus
    <Dialog open={isOpened} onClose={onClose} TransitionProps={{ tabIndex: 'unset' } as any}>
      <DialogTitle>
        {isLogged ? 'Choose another wallet or disconnect:' : 'Choose your wallet:'}
      </DialogTitle>
      <DialogContent>
        <Typography>By connecting to the wallet you accept Terms of Service.</Typography>
      </DialogContent>
      <DialogContent>
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
      <DialogContent>
        <Typography>
          {t(tKeys.applicationNetwork.getKey(), { networkName: ETH_NETWORK_CONFIG.name })}.
        </Typography>
      </DialogContent>
      {connecting.error && (
        <DialogContent>
          <Hint color="error">{connecting.error}</Hint>
        </DialogContent>
      )}
    </Dialog>
  );
}
