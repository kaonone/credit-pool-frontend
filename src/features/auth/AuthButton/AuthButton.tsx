import * as React from 'react';
import { GetProps } from '_helpers';

import { useApi } from 'services/api';
import { useSubscribable, useCommunication, withProps } from 'utils/react';
import { Button, Loading, Box } from 'components';

import { AuthModal } from './components/AuthModal';

const CustomBox = withProps(Box, { ml: 1.5, display: 'flex' });

type IProps = Pick<GetProps<typeof Button>, 'color'>;

export function AuthButton(props: IProps) {
  const { color } = props;
  const [isOpened, setIsOpened] = React.useState(false);
  const api = useApi();

  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);
  const [status] = useSubscribable(() => api.web3Manager.status, [], 'pending');
  const [connectedWallet] = useSubscribable(() => api.web3Manager.wallet, [], null);

  const connectCommunication = useCommunication(api.web3Manager.connect, []);

  const toggleIsOpened = React.useCallback(() => setIsOpened(!isOpened), [isOpened]);

  const handleDisconnectClick = React.useCallback(() => {
    api.web3Manager.disconnect();
    connectCommunication.reset();
  }, [connectCommunication.reset]);

  return (
    <>
      <Button
        color={color}
        variant="outlined"
        disabled={!accountMeta.loaded || status === 'pending'}
        onClick={toggleIsOpened}
      >
        <Loading meta={accountMeta}>{account || 'Connect to wallet'}</Loading>
        <Loading
          ignoreError
          meta={{ loaded: status !== 'pending', error: null }}
          communication={connectCommunication}
          progressVariant="circle"
          component={CustomBox}
          progressProps={{
            size: 24,
          }}
        />
      </Button>
      <AuthModal
        status={status}
        connectedWallet={connectedWallet}
        isOpened={isOpened}
        onClose={toggleIsOpened}
        account={account}
        connectCommunication={connectCommunication}
        connect={connectCommunication.execute}
        disconnect={handleDisconnectClick}
      />
    </>
  );
}
