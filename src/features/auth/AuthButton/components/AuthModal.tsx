import * as React from 'react';
import { WalletType, ConnectionStatus } from 'web3-wallets-kit';

import { CommunicationState } from 'utils/react';
import {
  Button,
  Loading,
  Dialog,
  DialogTitle,
  DialogContent,
  Hint,
  Typography,
  Box,
  ShortAddress,
  Grid,
} from 'components';

const walletTypes: WalletType[] = ['bitski', 'metamask', 'wallet-connect'];

interface AuthModalProps {
  isOpened: boolean;
  connectCommunication: CommunicationState<any, any>;
  account: string | null | undefined;
  status: ConnectionStatus;
  connectedWallet: WalletType | null;
  onClose(): void;
  connect(wallet: 'wallet-connect' | 'bitski' | 'metamask'): void;
  disconnect(): void;
}

export function AuthModal(props: AuthModalProps) {
  const {
    isOpened,
    onClose,
    connectCommunication,
    connect,
    account,
    disconnect,
    status,
    connectedWallet,
  } = props;
  const isLogged: boolean = !!account && !!connectedWallet;

  return (
    <Dialog open={isOpened} onClose={onClose}>
      <DialogTitle>
        {isLogged ? 'Choose another wallet or disconnect:' : 'Choose your wallet:'}
      </DialogTitle>
      <Loading
        component={DialogContent}
        meta={{ loaded: status !== 'pending', error: null }}
        communication={connectCommunication}
      />
      {isLogged && (
        <DialogContent>
          <Hint>
            <Box>
              <Typography>Your wallet provider: &quot;{connectedWallet}&quot;.</Typography>
              <Typography>
                Your wallet address: {account && <ShortAddress address={account} />}.
              </Typography>
            </Box>
          </Hint>
        </DialogContent>
      )}
      <DialogContent>
        <Hint>
          <Typography>By connecting to the wallet you accept Terms of Service.</Typography>
        </Hint>
      </DialogContent>
      <DialogContent>
        <Grid container spacing={1}>
          {isLogged && (
            <Grid item xs>
              <Button fullWidth color="primary" variant="outlined" onClick={disconnect}>
                Disconnect
              </Button>
            </Grid>
          )}
          {walletTypes.map((type, index) => (
            <Grid item xs key={index}>
              <ConnectButton connect={connect} type={type} key={type} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

interface ConnectButtonProps {
  connect(wallet: WalletType): void;
  type: WalletType;
}

function ConnectButton({ type, connect }: ConnectButtonProps) {
  const handleClick = React.useCallback(() => connect(type), [type]);

  return (
    <Button fullWidth color="primary" variant="contained" onClick={handleClick}>
      <Box component="span" whiteSpace="nowrap">
        {type}
      </Box>
    </Button>
  );
}
