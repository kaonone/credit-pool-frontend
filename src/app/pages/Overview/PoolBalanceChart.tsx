import * as React from 'react';
import BN from 'bn.js';
import moment from 'moment';
import * as R from 'ramda';

import { BalanceChart, IChartPoint, Loading } from 'components';
import { usePoolBalancesSubscription } from 'generated/gql/pool';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { decimalsToWei } from 'utils/bn';

function PoolBalanceChart() {
  const api = useApi();

  const [daiTokenInfo, daiTokenInfoMeta] = useSubscribable(
    () => api.tokens.getTokenInfo$('dai'),
    [],
  );
  const decimals = daiTokenInfo?.decimals || 0;

  const yearAgoDate = React.useMemo(
    () =>
      moment()
        .subtract(1, 'years')
        .unix(),
    [],
  ); // Date in seconds

  const balancesResult = usePoolBalancesSubscription({
    variables: {
      date: `0x${yearAgoDate.toString(16)}`, // Date in seconds
    },
  });
  const pools = balancesResult.data?.pools || [];

  const mockedPoints = React.useMemo(
    () => [
      {
        date:
          Date.now() -
          moment()
            .subtract(1, 'days')
            .unix() *
            1000, // Date in milliseconds
        value: 0,
      },
      { date: Date.now(), value: 0 }, // Date in milliseconds
    ],
    [],
  );

  const chartPoints: IChartPoint[] = React.useMemo(
    () =>
      pools.length && decimals
        ? pools.map(pool => ({
            date: parseInt(pool.id, 16) * 1000, // Date in milliseconds
            value:
              new BN(pool.lBalance)
                .muln(100)
                .div(decimalsToWei(decimals))
                .toNumber() / 100,
          }))
        : mockedPoints,
    [pools, decimals],
  );

  const lastPool = R.last(pools);
  const membersLength = (lastPool && new BN(lastPool.usersLength)) || new BN(0);

  return (
    <Loading gqlResults={balancesResult} meta={daiTokenInfoMeta}>
      <BalanceChart
        chartPoints={chartPoints}
        title="Pool balance"
        membersLength={membersLength.toNumber()}
      />
    </Loading>
  );
}

export { PoolBalanceChart };
