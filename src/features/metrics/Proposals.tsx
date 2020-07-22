import * as React from 'react';

import { Metric, Label, Grid, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { usePoolMetricsSubscription } from 'generated/gql/pool';

const tKeys = tKeysAll.components.metrics;

export function Proposals() {
  const { t } = useTranslate();

  const poolMetricsResult = usePoolMetricsSubscription();

  const proposalsCount = poolMetricsResult.data?.pools[0]?.proposalsCount || '0';

  return (
    <Grid container>
      <Metric
        title={<Label>{t(tKeys.proposals.getKey())}</Label>}
        value={proposalsCount}
        chart={<ChartBlock />}
      />
    </Grid>
  );
}
