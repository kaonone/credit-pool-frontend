import * as React from 'react';
import moment from 'moment';
import BN from 'bn.js';

import { BalanceChart, IChartPoint, Loading } from 'components';
import { useMyUserBalancesSubscription } from 'generated/gql/pool';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { decimalsToWei } from 'utils/bn';

const tKeys = tKeysAll.app.pages.overview;

function UserBalanceChart() {
  const api = useApi();
  const { t } = useTranslate();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const [currentBalance, currentBalanceMeta] = useSubscribable(
    () =>
      api.fundsModule.getPtkBalanceInDai$(account || '0x0000000000000000000000000000000000000000'),
    [account],
  );
  const [daiTokenInfo, daiTokenInfoMeta] = useSubscribable(
    () => api.tokens.getTokenInfo$('dai'),
    [],
  );
  const decimals = daiTokenInfo?.decimals;

  const yearAgoDate = React.useMemo(
    () =>
      moment()
        .subtract(1, 'years')
        .unix(),
    [],
  ); // Date in seconds

  const balancesResult = useMyUserBalancesSubscription({
    variables: {
      first: 1000,
      address: account || '',
      fromDate: new BN(yearAgoDate).toString(), // Date in seconds
    },
  });
  const balances = balancesResult.data?.balances || [];

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
      balances.length && decimals
        ? balances
            .map(balance => ({
              date: parseInt(balance.date, 10) * 1000, // Date in milliseconds
              value:
                new BN(balance.lBalance)
                  .muln(100)
                  .div(decimalsToWei(decimals))
                  .toNumber() / 100,
            }))
            .concat({
              value:
                (currentBalance
                  ?.muln(100)
                  .div(decimalsToWei(decimals))
                  .toNumber() || 0) / 100,
              date: Date.now(),
            })
        : mockedPoints,
    [balances, decimals, currentBalance?.toString()],
  );

  return (
    <Loading gqlResults={balancesResult} meta={[accountMeta, daiTokenInfoMeta, currentBalanceMeta]}>
      <BalanceChart
        currentBalance={currentBalance?.toString() || ''}
        chartPoints={chartPoints}
        title={t(tKeys.myBalanceTitle.getKey())}
      />
    </Loading>
  );
}

export { UserBalanceChart };
