import * as React from 'react';
import BN from 'bn.js';
import moment from 'moment';
import * as R from 'ramda';

import { BalanceChart, IChartPoint, Loading } from 'components';
import { usePoolBalancesQuery } from 'generated/gql/pool';

function PoolBalanceChart() {
  const lastYear = moment()
    .subtract(1, 'years')
    .unix();

  const balancesResult = usePoolBalancesQuery({
    variables: {
      date: `0x${lastYear.toString(16)}`,
    },
  });
  const pools = balancesResult.data?.pools || [];

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
      (pools.length &&
        pools.map(pool => ({
          date: parseInt(pool.id, 16),
          value: Number(pool.lBalance),
        }))) ||
      mockedPoints,
    [pools],
  );

  const currentBalance = (R.last(pools) && new BN(R.last(pools).lBalance)) || new BN(0);

  const membersLength = (R.last(pools) && new BN(R.last(pools).usersLength)) || new BN(0);

  return (
    <Loading gqlResults={balancesResult}>
      <BalanceChart
        chartPoints={chartPoints}
        title="Pool balance"
        balance={currentBalance}
        membersLength={membersLength.toNumber()}
      />
    </Loading>
  );
}

export { PoolBalanceChart };
