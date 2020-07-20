import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';
import { Metric, Label, FormattedAmount } from 'components';
import { percentAmount, liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics.myPoolShare;

export function MyPoolShare() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label hint={t(tKeys.description.getKey())}>{t(tKeys.myPoolShare.getKey())}</Label>}
      value={<FormattedAmount sum={percentAmount} />}
      subValue={
        <>
          <FormattedAmount sum={liquidityAmount} />
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
    totalLiquidity: {
      fontSize: 12,
      fontWeight: 300,
    },
  }),
  { name: 'MyPoolShare' },
);
