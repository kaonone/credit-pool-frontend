import * as React from 'react';

import { Metric, Label, Grid } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

const tKeys = tKeysAll.components.metrics;

const valueMock = '30 days';

export function AverageLoanTerm() {
  const { t } = useTranslate();

  return (
    <Grid container>
      <Metric title={<Label>{t(tKeys.averageLoanTerm.getKey())}</Label>} value={valueMock} />
    </Grid>
  );
}
