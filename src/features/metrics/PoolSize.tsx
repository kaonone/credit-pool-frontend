import * as React from 'react';

import { Metric, Title, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

const tKeys = tKeysAll.components.metrics.poolSize;

export function PoolSize() {
  const { t } = useTranslate();
  const classes = useStyles();

  return (
    <Metric
      title={<Title>{t(tKeys.poolSize.getKey())}</Title>}
      value={<FormattedAmount sum={liquidityAmount} />}
      subValue={
        <p className={classes.established}>{`${t(tKeys.established.getKey())} 30 June 2020`}</p>
      }
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
