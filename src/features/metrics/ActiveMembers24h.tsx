import * as React from 'react';
import BN from 'bn.js';

import { Metric, Label, Grid, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { usePoolInfo, usePoolInfoDayAgo } from 'features/poolInfo';

const tKeys = tKeysAll.components.metrics;

export function ActiveMembers24h() {
  const { t } = useTranslate();

  const { usersLength, gqlResult } = usePoolInfo();
  const { usersLengthDayAgo, gqlResultDayAgo } = usePoolInfoDayAgo();

  const value = new BN(usersLength).sub(new BN(usersLengthDayAgo)).toString();

  return (
    <Grid container>
      <Loading gqlResults={[gqlResult, gqlResultDayAgo]}>
        <Metric title={<Label>{t(tKeys.dayChange.getKey())}</Label>} value={value} />
      </Loading>
    </Grid>
  );
}
