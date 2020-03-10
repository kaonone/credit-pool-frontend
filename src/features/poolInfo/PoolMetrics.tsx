import BN from 'bn.js';
import React from 'react';
import moment from 'moment';

import { Typography, MetricsList, Loading, CashMetric } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { usePoolMetricsSubscription, usePoolMetricByDateSubscription } from 'generated/gql/pool';

const tKeys = tKeysAll.app.components.header;

type Props = Pick<React.ComponentProps<typeof MetricsList>, 'orientation' | 'withDividers'>;

export function PoolMetrics(props: Props) {
  const { t } = useTranslate();

  const poolMetricsGqlResult = usePoolMetricsSubscription();

  const lastDay = moment()
    .subtract(1, 'day')
    .unix(); // Date in seconds

  const poolMetricsDayAgoGqlResult = usePoolMetricByDateSubscription({
    variables: {
      date: `0x${lastDay.toString(16)}`, // Date in seconds
    },
  });

  const { lBalance, lDebt } = poolMetricsGqlResult.data?.pools[0] || {
    lBalance: '0',
    lDebt: '0',
  };

  const lBalanceDayAgo =
    (poolMetricsDayAgoGqlResult.data?.pools[0] &&
      poolMetricsDayAgoGqlResult.data.pools[0].lBalance) ||
    lBalance;

  const lDebtDayAgo =
    (poolMetricsDayAgoGqlResult.data?.pools[0] && poolMetricsDayAgoGqlResult.data.pools[0].lDebt) ||
    lDebt;

  return (
    <Loading gqlResults={[poolMetricsGqlResult, poolMetricsDayAgoGqlResult]}>
      {poolMetricsGqlResult.data?.pools.length ? (
        <MetricsList {...props}>
          <CashMetric
            title={t(tKeys.total.getKey())}
            value={new BN(lBalance).add(new BN(lDebt)).toString()}
            previousValue={new BN(lBalanceDayAgo).add(new BN(lDebtDayAgo)).toString()}
            token="dai"
          />
          <CashMetric
            title={t(tKeys.availableBalance.getKey())}
            value={lBalance}
            previousValue={lBalanceDayAgo}
            token="dai"
          />
          <CashMetric
            title={t(tKeys.issued.getKey())}
            value={lDebt}
            previousValue={lDebtDayAgo}
            token="dai"
          />
        </MetricsList>
      ) : (
        <Typography color="error">Pool metrics is not found</Typography>
      )}
    </Loading>
  );
}
