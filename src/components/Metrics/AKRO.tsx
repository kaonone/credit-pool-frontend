import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { AKROIcon } from 'components/icons';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { makeStyles } from 'utils/styles';

import { Decimal } from './Decimal';
import { Metric } from './Metric';

type Props = {
  decimal: Decimal;
  total: string;
};

const tKeys = tKeysAll.components.metrics.akro;

export function AKRO(props: Props) {
  const { decimal, total } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Metric
      title="AKRO"
      iconBeforeTitle={<AKROIcon width={19} height={20} />}
      titleDescription={t(tKeys.description.getKey())}
      content={<Decimal decimal={decimal} />}
      additionalInfo={<Typography className={classes.total}>{total}</Typography>}
    />
  );
}

const useStyles = makeStyles(
  () => ({
    total: {
      fontSize: 16,
      fontWeight: 400,
    },
  }),
  { name: 'AKRO' },
);
