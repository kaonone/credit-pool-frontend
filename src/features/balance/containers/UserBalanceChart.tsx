import * as React from 'react';
import moment from 'moment';
import BN from 'bn.js';

import { Loading } from 'components';
import { useMyUserBalancesSubscription, useMyUserSubscription } from 'generated/gql/pool';
import { useApi } from 'services/api';
import { makeStyles, useTheme } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { decimalsToWei } from 'utils/bn';
import { zeroAddress } from 'utils/mock';
import { InlineChart } from 'components/InlineChart/InlineChart';

const useStyles = makeStyles(
  {
    hidden: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    chart: {
      width: 53,
      height: 20,
    },
  },
  { name: 'UserBalanceChart' },
);

interface IUserBalancePoint {
  date: number;
  value: number;
}

function UserBalanceChart() {
  const classes = useStyles();
  const theme = useTheme();
  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const myUserResult = useMyUserSubscription({
    variables: {
      address: account?.toLowerCase() || '',
    },
  });
  const pLockedSum = myUserResult.data?.user?.pLockedSum || '0';
  const unlockLiquiditySum = myUserResult.data?.user?.unlockLiquiditySum || '0';

  const [currentBalance, currentBalanceMeta] = useSubscribable(
    () =>
      api.fundsModule.getAvailableBalance$(account || zeroAddress, pLockedSum, unlockLiquiditySum),
    [account, pLockedSum, unlockLiquiditySum],
  );
  const [liquidityToken, liquidityTokenMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [],
  );
  const decimals = liquidityToken?.decimals;

  const yearAgoDate = React.useMemo(() => moment().subtract(1, 'years').unix(), []); // Date in seconds

  const balancesResult = useMyUserBalancesSubscription({
    variables: {
      first: 1000,
      address: account || '',
      fromDate: new BN(yearAgoDate).toString(), // Date in seconds
    },
  });
  const balances = balancesResult.data?.exitBalances || [];

  const mockedPoints = React.useMemo<IUserBalancePoint[]>(
    () => [
      {
        date: Date.now() - moment().subtract(1, 'days').unix() * 1000, // Date in milliseconds
        value: 0,
      },
      { date: Date.now(), value: 0 }, // Date in milliseconds
    ],
    [],
  );

  const chartPoints: IUserBalancePoint[] = React.useMemo(
    () =>
      balances.length && decimals
        ? balances
            .map(balance => ({
              date: parseInt(balance.date, 10) * 1000, // Date in milliseconds
              value:
                new BN(balance.lBalance).muln(100).div(decimalsToWei(decimals)).toNumber() / 100,
            }))
            .concat({
              value: (currentBalance?.mul(100).div(decimalsToWei(decimals)).toNumber() || 0) / 100,
              date: Date.now(),
            })
        : mockedPoints,
    [balances, decimals, currentBalance?.toString()],
  );

  return (
    <Loading
      gqlResults={[balancesResult, myUserResult]}
      meta={[accountMeta, liquidityTokenMeta, currentBalanceMeta]}
    >
      <div className={classes.hidden}>
        <svg>{theme.gradients.linearChart[2].svgLinear('userBalanceChart')}</svg>
      </div>
      <div className={classes.chart}>
        <InlineChart
          points={chartPoints}
          lines={['value']}
          lineColors={{ value: 'url(#userBalanceChart)' }}
        />
      </div>
    </Loading>
  );
}

export { UserBalanceChart };
