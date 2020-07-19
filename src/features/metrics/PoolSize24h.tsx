import * as React from 'react';

import { Metric, Title, FormattedAmount, ChartBlock, Grid } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;
const profitSign: '+' | '-' = '+';

export function PoolSize24h() {
  const { t } = useTranslate();

  return (
    <Grid container>
      <Metric
        title={<Title>{t(tKeys.dayChange.getKey())}</Title>}
        value={<FormattedAmount sum={liquidityAmount} />}
        valueSign={profitSign}
      />
      <ChartBlock value="1234" variant="decrease" sign="+" />
    </Grid>
  );
}
