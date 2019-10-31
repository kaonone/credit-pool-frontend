import * as React from 'react';
import { empty } from 'rxjs';

import { useApi } from 'services/api';
import { Typography, Loading } from 'components';
import { useSubscribable } from 'utils/reactHooks';

import DaiBalance from './DaiBalance';
import CompoundUsers from './CompoundUsers';

interface IProps {}

function DemoPage(_props: IProps) {
  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.getEthAccount$(), []);
  const [balance, balanceMeta] = useSubscribable(() => {
    return account ? api.getDaiBalance$(account) : empty();
  }, [account]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
      <Typography variant="h5">DAI balance from web3.eth.Contract</Typography>
      <Loading meta={accountMeta}>
        {account ? (
          <>
            <Typography>{account}</Typography>
            <Loading meta={balanceMeta}>
              <Typography>{balance && balance.toString()}</Typography>
            </Loading>
          </>
        ) : (
          <Typography color="error">Ethereum account is not found</Typography>
        )}
      </Loading>
      <Typography variant="h5">DAI balance from GraphQL</Typography>
      <DaiBalance />
      <Typography variant="h5">Compound users from GraphQL</Typography>
      <CompoundUsers />
    </div>
  );
}

export default DemoPage;
