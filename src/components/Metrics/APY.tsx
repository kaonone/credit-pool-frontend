import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { Button } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';

import { Metric } from './Metric';

type Props = {
  percent: string;
  period: string;
  onWithdrawClick(): void;
};

const tKeys = tKeysAll.components.metrics.apy;

export function APY(props: Props) {
  const { percent, period, onWithdrawClick } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Metric
      title="APY"
      titleDescription={t(tKeys.description.getKey())}
      content={<Typography className={classes.percent}>{percent}&#37;</Typography>}
      additionalInfo={<Typography>{period}</Typography>}
      button={
        <Button variant="contained" color="primary" type="submit" onClick={onWithdrawClick}>
          {t(tKeys.withdraw.getKey())}
        </Button>
      }
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
  }),
  { name: 'APY' },
);
