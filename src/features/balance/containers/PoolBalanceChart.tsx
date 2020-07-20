import * as React from 'react';
import BN from 'bn.js';
import moment from 'moment';
import * as R from 'ramda';

import { BalanceChart, Loading } from 'components';
import { usePoolBalancesSubscription } from 'generated/gql/pool';
import { useTranslate, tKeys } from 'services/i18n';
import { useApi } from 'services/api';
import { makeStyles, useTheme } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { decimalsToWei } from 'utils/bn';
import { isEqualHex } from 'utils/hex';
import { ETH_NETWORK_CONFIG } from 'env';

import { CurrentBalance, BalanceValue } from '../components/CurrentBalance';

export const useStyles = makeStyles(() => ({
  hidden: {
    opacity: 0,
    width: 0,
    height: 0,
  },
}));

interface PoolPoint {
  date: number;
  lEnterPrice: number;
  lExitPrice: number;
}

function PoolBalanceChart() {
  const classes = useStyles();
  const theme = useTheme();
  const api = useApi();
  const { t } = useTranslate();

  const [liquidityCurrency, liquidityCurrencyMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [],
  );
  const decimals = liquidityCurrency?.decimals || 0;

  const yearAgoDate = React.useMemo(() => moment().subtract(1, 'years').unix(), []); // Date in seconds

  const balancesResult = usePoolBalancesSubscription({
    variables: {
      date: `0x${yearAgoDate.toString(16)}`, // Date in seconds
      // filter wrong values, only for mainnet pool 0x73067fdd366Cb678E9b539788F4C0f34C5700246
      minUsersLength: isEqualHex(
        ETH_NETWORK_CONFIG.contracts.pool,
        '0x73067fdd366Cb678E9b539788F4C0f34C5700246',
      )
        ? '3'
        : '1',
    },
  });
  const pools = balancesResult.data?.pools || [];

  const mockedPoints = React.useMemo<PoolPoint[]>(
    () => [
      {
        date: Date.now() - moment().subtract(1, 'days').unix() * 1000, // Date in milliseconds
        lEnterPrice: 0,
        lExitPrice: 0,
      },
      { date: Date.now(), lEnterPrice: 0, lExitPrice: 0 }, // Date in milliseconds
    ],
    [],
  );

  const chartPoints: PoolPoint[] = React.useMemo(
    () =>
      pools.length && decimals
        ? pools.map<PoolPoint>(pool => ({
            date: parseInt(pool.id, 16) * 1000, // Date in milliseconds
            lEnterPrice: convertPtkPriceToDaiPrice(pool.pEnterPrice, decimals, 'number'),
            lExitPrice: convertPtkPriceToDaiPrice(pool.pExitPrice, decimals, 'number'),
          }))
        : mockedPoints,
    [pools, decimals],
  );

  const lastPool = R.last(pools);
  const currentLEnterPrice =
    (lastPool && convertPtkPriceToDaiPrice(lastPool.pEnterPrice, decimals, 'weiBN')) || '0';
  const currentLExitPrice =
    (lastPool && convertPtkPriceToDaiPrice(lastPool.pExitPrice, decimals, 'weiBN')) || '0';

  const renderCurrentBalance = React.useCallback(() => {
    const balanceValues: BalanceValue[] = [
      {
        label: t(tKeys.components.poolBalanceChart.ptkDepositPrice.getKey()),
        color: '#d93cef',
        sum: currentLEnterPrice,
        token: 'dai',
      },
      {
        label: t(tKeys.components.poolBalanceChart.ptkWithdrawalPrice.getKey()),
        color: '#594cf2',
        sum: currentLExitPrice,
        token: 'dai',
      },
    ];

    return <CurrentBalance balanceValues={balanceValues} />;
  }, [currentLEnterPrice, currentLExitPrice]);

  return (
    <Loading gqlResults={balancesResult} meta={liquidityCurrencyMeta}>
      <div className={classes.hidden}>
        <svg>
          {theme.gradients.poolBalanceChart[0].svgLinear('lEnterPriceGradient')}
          {theme.gradients.poolBalanceChart[1].svgLinear('lExitPriceGradient')}
        </svg>
      </div>
      <BalanceChart
        chartPoints={chartPoints}
        chartLines={['lExitPrice', 'lEnterPrice']}
        chartLineColors={{
          lEnterPrice: 'url(#lEnterPriceGradient)',
          lExitPrice: 'url(#lExitPriceGradient)',
        }}
        title={t(tKeys.app.pages.overview.poolBalanceTitle.getKey())}
        renderCurrentBalance={renderCurrentBalance}
      />
    </Loading>
  );
}

function convertPtkPriceToDaiPrice(price: string | BN, decimals: number, output: 'number'): number;
function convertPtkPriceToDaiPrice(price: string | BN, decimals: number, output: 'weiBN'): BN;
function convertPtkPriceToDaiPrice(
  price: string | BN,
  decimals: number,
  output: 'number' | 'weiBN',
): number | BN {
  const bnPrice = new BN(price);

  const byOutput = {
    number: () =>
      bnPrice.isZero() ? bnPrice : decimalsToWei(decimals).muln(100).div(bnPrice).toNumber() / 100,
    weiBN: () =>
      bnPrice.isZero()
        ? bnPrice
        : decimalsToWei(decimals).mul(decimalsToWei(decimals)).div(bnPrice),
  };

  return byOutput[output]();
}

export { PoolBalanceChart };
