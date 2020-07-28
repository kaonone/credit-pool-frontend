import * as React from 'react';
import BN from 'bn.js';

import { Metric, Label, FormattedAmount, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { usePoolInfo, usePoolInfoDayAgo } from 'features/poolInfo';
import { LiquidityAmount, Currency } from 'model/entities';

const tKeys = tKeysAll.components.metrics;

export function PoolSize24h() {
  const { t } = useTranslate();

  const { lBalance, lDebt, gqlResult } = usePoolInfo();
  const { lBalanceDayAgo, lDebtDayAgo, gqlResultDayAgo } = usePoolInfoDayAgo();

  const balance = new BN(lBalance).add(new BN(lDebt));
  const prevBalance = new BN(lBalanceDayAgo).add(new BN(lDebtDayAgo));

  const value = new LiquidityAmount(
    new BN(balance.sub(prevBalance)).add(new BN(lDebt)),
    new Currency('$', 18),
  );

  return (
    <Loading gqlResults={[gqlResult, gqlResultDayAgo]}>
      <Metric
        title={<Label>{t(tKeys.dayChange.getKey())}</Label>}
        value={<FormattedAmount hasSign sum={value} />}
      />
    </Loading>
  );
}
