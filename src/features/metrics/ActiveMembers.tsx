import * as React from 'react';

import { Metric, Label, Grid, Loading } from 'components';
import { Cat1 } from 'components/icons';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';
import { usePoolInfo } from 'features/poolInfo';

import { progressProps } from './common';

const tKeys = tKeysAll.components.metrics;

export function ActiveMembers() {
  const { t } = useTranslate();
  const classes = useStyles();

  const { usersLength, gqlResult } = usePoolInfo();

  return (
    <Grid container>
      <Metric
        title={<Label>{t(tKeys.activeMembers.getKey())}</Label>}
        value={
          <Loading gqlResults={gqlResult} progressProps={progressProps}>
            {usersLength}
          </Loading>
        }
      />
      <Cat1 className={classes.avatar} />
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 70,
    marginLeft: 40,
  },
}));
