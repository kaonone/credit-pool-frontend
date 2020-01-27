import * as React from 'react';
import BN from 'bn.js';
import moment from 'moment';
import * as R from 'ramda';

import { BalanceChart, IChartPoint, Loading } from 'components';
import { usePoolBalancesQuery } from 'generated/gql/pool';

function PoolBalanceChart() {
  const lastYear = moment()
    .subtract(1, 'years')
    .unix(); // Date in seconds

  const balancesResult = usePoolBalancesQuery({
    variables: {
      date: `0x${lastYear.toString(16)}`, // Date in seconds
    },
  });
  const pools = balancesResult.data?.pools || [];

  const mockedPoints = React.useMemo(
    () => [
      { date: Date.now() - 1, value: 0 },
      { date: Date.now(), value: 0 }, // Date in milliseconds
    ],
    [],
  );

  const chartPoints: IChartPoint[] = React.useMemo(
    () =>
      (pools.length &&
        pools.map(pool => ({
          date: parseInt(pool.id, 16) * 1000, // Date in milliseconds
          value: Number(pool.lBalance), // TODO need to divide on 10^decimals before casting
        }))) ||
      mockedPoints,
    [pools],
  );

  const lastPool = R.last(pools);
  const membersLength = (lastPool && new BN(lastPool.usersLength)) || new BN(0);

  return (
    <Loading gqlResults={balancesResult}>
      <BalanceChart
        chartPoints={chartPoints}
        title="Pool balance"
        membersLength={membersLength.toNumber()}
      />
    </Loading>
  );
}

export { PoolBalanceChart };
