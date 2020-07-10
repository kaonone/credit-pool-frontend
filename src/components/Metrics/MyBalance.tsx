import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { Button } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';

import { Metric } from './Metric';

type Decimal = {
  integral: string;
  fractional: string;
};

type Props = {
  decimal: Decimal;
  onDepositClick(): void;
};

const tKeys = tKeysAll.components.metrics.myBalance;

export function MyBalance(props: Props) {
  const {
    decimal: { integral, fractional },
    onDepositClick,
  } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Metric
      title={t(tKeys.myBalance.getKey())}
      titleDescription={t(tKeys.description.getKey())}
      content={
        <Typography className={classes.decimal}>
          &#36;{integral}
          <span className={classes.fractional}>.{fractional}</span>
        </Typography>
      }
      button={
        <Button variant="contained" color="primary" type="submit" onClick={onDepositClick}>
          {t(tKeys.deposit.getKey())}
        </Button>
      }
    />
  );
}

const useStyles = makeStyles(
  () => ({
    decimal: {
      fontSize: 32,
      fontWeight: 300,
      lineHeight: 'normal',
    },
    fractional: {
      color: '#494972',
    },
  }),
  { name: 'MyBalance' },
);
