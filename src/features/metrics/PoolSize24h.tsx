import * as React from 'react';
import BN from 'bn.js';

import { Metric, Label, FormattedAmount, Loading } from 'components';
import { usePoolInfo, usePoolInfoDayAgo } from 'features/poolInfo';
import { LiquidityAmount } from 'model/entities';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

type Props = {
  title?: string;
};

export function PoolSize24h(props: Props) {
  const { title = '24h Change' } = props;

  const api = useApi();
  const [liquidityCurrency, liquidityCurrencyMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [api],
  );
  const { lBalance, lDebt, gqlResult } = usePoolInfo();
  const { lBalanceDayAgo, lDebtDayAgo, gqlResultDayAgo } = usePoolInfoDayAgo();

  const balance = new BN(lBalance).add(new BN(lDebt));
  const prevBalance = new BN(lBalanceDayAgo).add(new BN(lDebtDayAgo));

  const value = React.useMemo(
    () =>
      liquidityCurrency
        ? new LiquidityAmount(new BN(balance.sub(prevBalance)), liquidityCurrency)
        : null,
    [liquidityCurrency],
  );

  return (
    <Loading gqlResults={[gqlResult, gqlResultDayAgo]} meta={liquidityCurrencyMeta}>
      {value && (
        <Metric title={<Label>{title}</Label>} value={<FormattedAmount hasSign sum={value} />} />
      )}
    </Loading>
  );
}
