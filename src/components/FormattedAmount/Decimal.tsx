import * as React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { Decimal as DecimalType } from 'model/types';
import { formatInteger } from 'utils/format';

type Props = {
  decimal: DecimalType;
  theme?: 'plain' | 'default';
};

export function Decimal(props: Props) {
  const {
    decimal: { integer, fractional },
    theme,
  } = props;
  const classes = useStyles(props);

  return (
    <>
      {formatInteger(integer)}
      <span className={cn({ [classes.fractional]: theme === 'plain' })}>.{fractional}</span>
    </>
  );
}

const useStyles = makeStyles(
  () => ({
    fractional: {
      color: '#494972',
    },
  }),
  { name: 'Decimal' },
);
