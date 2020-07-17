import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { Decimal as DecimalType } from 'model/types';
import { formatInteger } from 'utils/format';

type Props = {
  decimal: DecimalType;
};

export function Decimal(props: Props) {
  const {
    decimal: { integer, fractional },
  } = props;
  const classes = useStyles(props);

  return (
    <>
      {formatInteger(integer)}
      <span className={classes.fractional}>.{fractional}</span>
    </>
  );
}

const useStyles = makeStyles(() => ({
  fractional: {
    color: '#494972',
  },
}));
