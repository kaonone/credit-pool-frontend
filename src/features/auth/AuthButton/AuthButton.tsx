import * as React from 'react';

import { useApi } from 'services/api';
import { useSubscribable, useCommunication, withProps } from 'utils/react';
import { Button, Loading, Box } from 'components';

import { AuthModal } from './components/AuthModal';

const CustomBox = withProps(Box, { ml: 1.5, display: 'flex' });

export function AuthButton() {
  const [isOpened, setIsOpened] = React.useState(false);
  const api = useApi();

  const [account, accountMeta] = useSubscribable(() => api.getEthAccount$(), []);

  const connectCommunication = useCommunication(api.connectToWallet, []);

  const toggleIsOpened = React.useCallback(() => setIsOpened(!isOpened), [isOpened]);

  const handleDisconnectClick = React.useCallback(() => {
    api.disconnectFromWallet();
    connectCommunication.reset();
  }, [connectCommunication.reset]);

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        disabled={!accountMeta.loaded}
        onClick={toggleIsOpened}
      >
        <Loading meta={accountMeta}>{account || 'Connect to wallet'}</Loading>
        <Loading
          ignoreError
          communication={connectCommunication}
          progressVariant="circle"
          component={CustomBox}
          progressProps={{
            size: 24,
          }}
        />
      </Button>
      <AuthModal
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
