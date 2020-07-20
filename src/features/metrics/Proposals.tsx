import * as React from 'react';

import { Metric, Title, Grid, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

const tKeys = tKeysAll.components.metrics;

const valueMock = '200';

export function Proposals() {
  const { t } = useTranslate();

  return (
    <Grid container>
      <Metric
        title={<Title>{t(tKeys.proposals.getKey())}</Title>}
        value={valueMock}
        chart={<ChartBlock value="1234" variant="increase" sign="+" />}
      />
    </Grid>
  );
}
