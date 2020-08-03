import * as React from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Avatar from '@material-ui/core/Avatar';
import { empty } from 'rxjs';

import { NETWORK_ID } from 'env';
import { useApi } from 'services/api';
import { getShortAddress } from 'utils/format';
import { useSubscribable, useCommunication, useOnChangeState } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { tKeys, useTranslate } from 'services/i18n';
import { Button, Loading, Typography, Grid } from 'components';

import { AuthModal } from './components/AuthModal';

interface Props {
  connectRedirectPath: string;
  disconnectRedirectPath: string;
}

export function AuthButton({ connectRedirectPath, disconnectRedirectPath }: Props) {
  const [isOpened, setIsOpened] = React.useState(false);
  const [needToRedirect, setNeedToRedirect] = React.useState(false);
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();

  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account$, [], null);
  const [status] = useSubscribable(() => api.web3Manager.status, [], 'pending');
  const [connectedWallet] = useSubscribable(() => api.web3Manager.connectedWallet, [], null);

  const connectCommunication = useCommunication(api.web3Manager.connect, []);

  const toggleIsOpened = React.useCallback(() => {
    setIsOpened(!isOpened);
    !isOpened && setNeedToRedirect(true);
  }, [isOpened]);

  const history = useHistory();

  const handleDisconnectClick = React.useCallback(() => {
    api.web3Manager.disconnect();
    connectCommunication.reset();
    setIsOpened(false);
  }, [connectCommunication.reset]);

  const [distributionBalance] = useSubscribable(
    () => (account ? api.pToken.getDistributionBalanceOf$(account) : empty()),
    [api, account],
  );

  useOnChangeState(
    connectedWallet,
    (prev, cur) => prev !== cur,
    (_, cur) => {
      if (!cur) {
        setNeedToRedirect(false);
        history.push(disconnectRedirectPath);
      }
    },
  );

  useOnChangeState(
    { needToRedirect, distributionBalance },
    (prev, cur) => cur.needToRedirect && !prev.distributionBalance && !!cur.distributionBalance,
    () => {
      history.push(connectRedirectPath);
      setIsOpened(false);
    },
  );

  const isConnected: boolean = accountMeta.loaded && !!account;

  return (
    <>
      <Button
        color={connectedWallet ? 'default' : 'primary'}
        variant={connectedWallet ? 'outlined' : 'contained'}
        onClick={toggleIsOpened}
        disabled={!accountMeta.loaded}
        className={cn(classes.root, { [classes.connected]: isConnected })}
        endIcon={
          <Loading
            ignoreError
            meta={{ loaded: status !== 'pending', error: null }}
            communication={connectCommunication}
            progressVariant="circle"
            progressProps={{
              size: 16,
            }}
          />
        }
      >
        <Loading meta={accountMeta}>
          {account ? (
            <>
              <Avatar className={classes.icon}>
                <Jazzicon diameter={34} seed={jsNumberForAddress(account)} />
              </Avatar>
              <Grid
                container
                alignItems="flex-start"
                direction="column"
                spacing={0}
                className={classes.container}
              >
                <Grid item>
                  <Typography className={classes.address}>{getShortAddress(account)}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.connectedTo}>
                    {`${t(tKeys.features.auth.modalTitle.connectedTo.getKey())} 
                    ${t(tKeys.features.networkWarning.networkType[NETWORK_ID].getKey())}`}
                  </Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            t(tKeys.features.auth.connect.getKey())
          )}
        </Loading>
      </Button>
      <AuthModal
        connectedWallet={connectedWallet}
        isOpened={isOpened}
        onClose={toggleIsOpened}
        account={account}
        connecting={connectCommunication}
        connect={connectCommunication.execute}
        disconnect={handleDisconnectClick}
      />
    </>
  );
}

const useStyles = makeStyles({
  root: {
    '&$connected': {
      padding: 0,
    },
  },
  address: {
    fontSize: 12,
    lineHeight: 1,
  },
  connectedTo: {
    fontSize: 12,
    lineHeight: 1,
    opacity: 0.5,
    marginTop: 3,
  },
  container: {
    marginLeft: 11,
    paddingRight: 16,
  },
  icon: {
    width: 34,
    height: 34,
  },
  connected: {},
});
