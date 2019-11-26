import * as React from 'react';
import { WalletType } from 'web3-wallets-kit';

import { CommunicationState } from 'utils/react';
import {
  Button,
  Loading,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Hint,
  Typography,
} from 'components';

const walletTypes: WalletType[] = ['bitski', 'metamask', 'wallet-connect'];

interface AuthModalProps {
  isOpened: boolean;
  connectCommunication: CommunicationState<any, any>;
  account: string | null | undefined;
  onClose(): void;
  connect(wallet: 'wallet-connect' | 'bitski' | 'metamask'): void;
  disconnect(): void;
}

export function AuthModal(props: AuthModalProps) {
  const { isOpened, onClose, connectCommunication, connect, account, disconnect } = props;
  const isLogged: boolean = !!account;

  return (
    <Dialog open={isOpened} onClose={onClose}>
      <DialogTitle>
        {isLogged ? 'Choose another wallet or disconnect:' : 'Choose your wallet:'}
      </DialogTitle>
      <Loading component={DialogContent} communication={connectCommunication} />
      {isLogged && (
        <DialogContent>
          <Hint>
            <Typography>Connected wallet is {account}.</Typography>
          </Hint>
        </DialogContent>
      )}
      <DialogContent>
        <Hint>
          <Typography>By connecting to the wallet you accept Terms of Service.</Typography>
        </Hint>
      </DialogContent>
      <DialogActions>
        {isLogged && (
          <Button color="primary" variant="outlined" onClick={disconnect}>
            Disconnect
          </Button>
        )}
        {walletTypes.map(type => (
          <ConnectButton connect={connect} type={type} key={type} />
        ))}
      </DialogActions>
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
    <Button color="primary" variant="contained" onClick={handleClick}>
      {type}
    </Button>
  );
}
