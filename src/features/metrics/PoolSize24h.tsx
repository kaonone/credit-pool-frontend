import * as React from 'react';
import BN from 'bn.js';

import { Metric, Label, FormattedAmount, Loading } from 'components';
import { usePoolInfo, usePoolInfoDayAgo } from 'features/poolInfo';
import { LiquidityAmount, Currency } from 'model/entities';

type Props = {
  title?: string;
};

export function PoolSize24h(props: Props) {
  const { title = '24h Change' } = props;

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
      <Metric title={<Label>{title}</Label>} value={<FormattedAmount hasSign sum={value} />} />
    </Loading>
  );
}
