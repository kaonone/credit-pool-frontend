import * as React from 'react';

import { Metric, Label, Grid } from 'components';
import { Cat1 } from 'components/icons';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';

const tKeys = tKeysAll.components.metrics;

const valueMock = '1000';

export function ActiveMembers() {
  const { t } = useTranslate();
  const classes = useStyles();

  return (
    <Grid container>
      <Metric title={<Label>{t(tKeys.activeMembers.getKey())}</Label>} value={valueMock} />
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
