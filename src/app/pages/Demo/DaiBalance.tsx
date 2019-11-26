import * as React from 'react';

import { useBalancesByAddressQuery } from 'generated/gql/dai-graphql';
import { useApi } from 'services/api';
import { Loading, Typography } from 'components';
import { useSubscribable } from 'utils/react';

export function DaiBalance() {
  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.getEthAccount$(), []);

  return (
    <Loading meta={accountMeta}>
      {account ? <Balance account={account} /> : 'Account is not found'}
    </Loading>
  );
}

interface BalanceProp {
  account: string;
}

function Balance({ account }: BalanceProp) {
  const { loading, error, data } = useBalancesByAddressQuery({ variables: { address: account } });
  return (
    <Loading meta={{ error: error ? error.message : null, loaded: !loading }}>
      <Typography>
        Balance for {account} is{' '}
        {data && data.balances.length ? `${data.balances[0].wad} DAI` : 'not found'}
      </Typography>
    </Loading>
  );
}
