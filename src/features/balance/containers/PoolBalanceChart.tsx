import * as React from 'react';
import BN from 'bn.js';
import moment from 'moment';
import * as R from 'ramda';

import { BalanceChart, Loading, FormattedBalance } from 'components';
import { usePoolBalancesSubscription } from 'generated/gql/pool';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { makeStyles, useTheme } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { decimalsToWei } from 'utils/bn';
import { isEqualHex } from 'utils/hex';
import { ETH_NETWORK_CONFIG } from 'env';

export const useStyles = makeStyles(theme => ({
  enterPrice: {
    color: theme.colors.shamrock,
  },
  exitPrice: {
    color: theme.palette.type === 'dark' ? theme.colors.heliotrope : theme.palette.primary.dark,
  },
}));

const tKeys = tKeysAll.app.pages.overview;

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

  const renderCurrentBalance = React.useCallback(
    () => (
      <>
        <FormattedBalance className={classes.enterPrice} sum={currentLEnterPrice} token="dai" /> /{' '}
        <FormattedBalance className={classes.exitPrice} sum={currentLExitPrice} token="dai" />
      </>
    ),
    [currentLEnterPrice, currentLExitPrice],
  );

  return (
    <Loading gqlResults={balancesResult} meta={liquidityCurrencyMeta}>
      <BalanceChart
        chartPoints={chartPoints}
        chartLines={['lExitPrice', 'lEnterPrice']}
        chartLineColors={{
          lEnterPrice: theme.colors.shamrock,
          lExitPrice:
            theme.palette.type === 'dark' ? theme.colors.heliotrope : theme.palette.primary.dark,
        }}
        title={t(tKeys.poolBalanceTitle.getKey())}
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
