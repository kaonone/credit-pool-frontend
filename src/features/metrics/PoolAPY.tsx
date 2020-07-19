import * as React from 'react';

import { Metric, Title, FormattedAmount, Grid, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { percentAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function PoolAPY() {
  const { t } = useTranslate();

  return (
    <Grid container>
      <Metric
        title={<Title>{t(tKeys.poolAPY.getKey())}</Title>}
        value={<FormattedAmount sum={percentAmount} />}
      />
      <ChartBlock />
    </Grid>
  );
}
