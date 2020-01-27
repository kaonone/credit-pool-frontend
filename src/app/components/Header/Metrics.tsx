import BN from 'bn.js';
import React from 'react';

import { Typography, MetricsList, IMetric } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { PoolMetricsSubscription } from 'generated/gql/pool';

const tKeys = tKeysAll.app.components.header;

interface MetricsProps {
  data: PoolMetricsSubscription;
}

export function Metrics({ data }: MetricsProps) {
  const { t } = useTranslate();

  if (!data.pools.length) {
    return <Typography color="error">Pool metrics is not found</Typography>;
  }

  const { lBalance, lDebt } = data.pools[0];
  const metrics: IMetric[] = React.useMemo(
    () => [
      {
        title: t(tKeys.total.getKey()),
        value: new BN(lBalance).add(new BN(lDebt)).toString(),
        isCashMetric: true,
        profit: '12.81', // TODO Calculate
        token: 'dai',
      },
      {
        title: t(tKeys.availableBalance.getKey()),
        value: lBalance,
        isCashMetric: true,
        profit: '12.81', // TODO Calculate
        token: 'dai',
      },
      {
        title: t(tKeys.issued.getKey()),
        value: lDebt,
        isCashMetric: true,
        profit: '12.81', // TODO Calculate
        token: 'dai',
      },
    ],
    [t, lBalance, lDebt],
  );

  return <MetricsList metrics={metrics} />;
}
