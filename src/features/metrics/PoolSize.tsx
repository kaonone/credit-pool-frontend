import * as React from 'react';

import { Metric, Label, FormattedAmount, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

const tKeys = tKeysAll.components.metrics.poolSize;

export function PoolSize() {
  const { t } = useTranslate();
  const classes = useStyles();

  return (
    <Metric
      title={<Label>{t(tKeys.poolSize.getKey())}</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
      subValue={
        <span className={classes.established}>{`${t(
          tKeys.established.getKey(),
        )} 30 June 2020`}</span>
      }
      chart={<ChartBlock value="1234" variant="increase" sign="+" />}
    />
  );
}

const useStyles = makeStyles(
  () => ({
    established: {
      fontSize: 12,
      fontWeight: 300,
    },
  }),
  { name: 'PoolSize' },
);
