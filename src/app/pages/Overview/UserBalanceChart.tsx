import * as React from 'react';
import BN from 'bn.js';
import moment from 'moment';
import * as R from 'ramda';

import { BalanceChart, IChartPoint, Loading } from 'components';
import { useMyUserBalancesSubscription } from 'generated/gql/pool';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

function UserBalanceChart() {
  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const lastYear = moment()
    .subtract(1, 'years')
    .unix();

  const balancesResult = useMyUserBalancesSubscription({
    variables: {
      first: 1000,
      address: account || '',
      date: `0x${lastYear.toString(16)}`,
    },
  });
  const balances = balancesResult.data?.balances || [];

  const mockedPoints = React.useMemo(
    () => [
      {
        date: moment()
          .subtract(1, 'years')
          .valueOf(),
        value: 0,
      },
      { date: Date.now(), value: 0 },
    ],
    [Date],
  );

  const chartPoints: IChartPoint[] = React.useMemo(
    () =>
      (balances.length &&
        balances.map(balance => ({
          date: parseInt(balance.id, 16),
          value: Number(balance.lBalance),
        }))) ||
      mockedPoints,
    [balances, mockedPoints],
  );

  const currentBalance = (R.last(balances) && new BN(R.last(balances).lBalance)) || new BN(0);

  return (
    <Loading gqlResults={balancesResult} meta={accountMeta}>
      <BalanceChart chartPoints={chartPoints} title="My balance" balance={currentBalance} />
    </Loading>
  );
}

export { UserBalanceChart };
