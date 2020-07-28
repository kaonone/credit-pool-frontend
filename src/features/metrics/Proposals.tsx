import * as React from 'react';

import { Metric, Label, Grid, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { usePoolInfo } from 'features/poolInfo';

const tKeys = tKeysAll.components.metrics;

export function Proposals() {
  const { t } = useTranslate();

  const { proposalsCount, gqlResult } = usePoolInfo();

  return (
    <Loading gqlResults={gqlResult}>
      <Grid container>
        <Metric title={<Label>{t(tKeys.proposals.getKey())}</Label>} value={proposalsCount} />
      </Grid>
    </Loading>
  );
}
