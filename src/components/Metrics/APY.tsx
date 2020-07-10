import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';

import { Metric } from './Metric';

type Props = {
  percent: string;
  period: string;
};

const tKeys = tKeysAll.components.metrics.apy;

export function APY(props: Props) {
  const { percent, period } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Metric
      title="APY"
      titleDescription={t(tKeys.description.getKey())}
      content={<Typography className={classes.percent}>{percent}&#37;</Typography>}
      additionalInfo={<Typography className={classes.period}>{period}</Typography>}
    />
  );
}

const useStyles = makeStyles(
  () => ({
    percent: {
      fontSize: 32,
      fontWeight: 300,
      lineHeight: 'normal',
    },
    period: {
      fontSize: 16,
      fontWeight: 400,
    },
  }),
  { name: 'APY' },
);
