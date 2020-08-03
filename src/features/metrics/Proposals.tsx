import * as React from 'react';

import { Metric, Label, Grid, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { usePoolInfo } from 'features/poolInfo';

import { progressProps } from './common';

const tKeys = tKeysAll.components.metrics;

export function Proposals() {
  const { t } = useTranslate();

  const { proposalsCount, gqlResult } = usePoolInfo();

  return (
    <Grid container>
      <Metric
        title={<Label>{t(tKeys.proposals.getKey())}</Label>}
        value={
          <Loading gqlResults={gqlResult} progressProps={progressProps}>
            {proposalsCount}
          </Loading>
        }
      />
    </Grid>
  );
}
