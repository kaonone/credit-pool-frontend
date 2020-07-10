import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';

import { Decimal } from './Decimal';
import { Metric } from './Metric';

type Props = {
  percent: string;
  totalPoolLiquidityDecimal: Decimal;
};

const tKeys = tKeysAll.components.metrics.myPoolShare;

export function MyPoolShare(props: Props) {
  const { percent, totalPoolLiquidityDecimal } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Metric
      title={t(tKeys.myPoolShare.getKey())}
      titleDescription={t(tKeys.description.getKey())}
      content={<Typography className={classes.percent}>{percent}&#37;</Typography>}
      additionalInfo={
        <>
          <Decimal decimal={totalPoolLiquidityDecimal} currency={<>&#36;</>} size="small" />
          <Typography className={classes.totalLiquidity}>
            {t(tKeys.totalPoolLiquidity.getKey())}
          </Typography>
        </>
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
    totalLiquidity: {
      fontSize: 12,
      fontWeight: 300,
    },
  }),
  { name: 'MyPoolShare' },
);
