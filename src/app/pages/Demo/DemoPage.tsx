import * as React from 'react';
import { empty } from 'rxjs';

import { useApi } from 'services/api';
import { Typography, Loading } from 'components';
import { useSubscribable } from 'utils/reactHooks';

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
      <Loading meta={accountMeta}>
        {account && (
          <>
            <Typography>{account}</Typography>
            <Loading meta={balanceMeta}>
              <Typography>{balance && balance.toString()}</Typography>
            </Loading>
          </>
        )}
      </Loading>
    </div>
  );
}

export default DemoPage;
