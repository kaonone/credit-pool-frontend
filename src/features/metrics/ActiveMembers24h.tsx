import * as React from 'react';

import { Metric, Label, Grid, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

const tKeys = tKeysAll.components.metrics;

const valueMock = '200';

export function ActiveMembers24h() {
  const { t } = useTranslate();

  return (
    <Grid container>
      <Metric
        title={<Label>{t(tKeys.dayChange.getKey())}</Label>}
        value={valueMock}
        chart={<ChartBlock value="1234" variant="increase" sign="+" />}
      />
    </Grid>
  );
}
