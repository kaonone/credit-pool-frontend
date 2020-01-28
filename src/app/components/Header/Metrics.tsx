import BN from 'bn.js';
import React from 'react';

import { Typography, MetricsList, IMetric } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { PoolMetricsSubscription, PoolMetricByDateSubscription } from 'generated/gql/pool';

const tKeys = tKeysAll.app.components.header;

interface MetricsProps {
  data: PoolMetricsSubscription;
  dayAgoData?: PoolMetricByDateSubscription;
}

export function Metrics({ data, dayAgoData }: MetricsProps) {
  const { t } = useTranslate();

  if (!data.pools.length) {
    return <Typography color="error">Pool metrics is not found</Typography>;
  }

  const { lBalance, lDebt } = data.pools[0];

  const lBalanceDayAgo = (dayAgoData?.pools[0] && dayAgoData.pools[0].lBalance) || lBalance;
  const lDebtDayAgo = (dayAgoData?.pools[0] && dayAgoData.pools[0].lDebt) || lDebt;

  const metrics: IMetric[] = React.useMemo(
    () => [
      {
        title: t(tKeys.total.getKey()),
        value: new BN(lBalance).add(new BN(lDebt)).toString(),
        previousValue: new BN(lBalanceDayAgo).add(new BN(lDebtDayAgo)).toString(),
        isCashMetric: true,
        token: 'dai',
      },
      {
        title: t(tKeys.availableBalance.getKey()),
        value: lBalance,
        previousValue: lBalanceDayAgo,
        isCashMetric: true,
        token: 'dai',
      },
      {
        title: t(tKeys.issued.getKey()),
        value: lDebt,
        previousValue: lDebtDayAgo,
        isCashMetric: true,
        token: 'dai',
      },
    ],
    [t, lBalance, lBalanceDayAgo, lDebt, lDebtDayAgo],
  );

  return <MetricsList metrics={metrics} />;
}
