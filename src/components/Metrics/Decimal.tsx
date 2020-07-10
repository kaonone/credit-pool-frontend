import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from 'utils/styles';

export type Decimal = {
  integral: string;
  fractional: string;
};

type Size = 'small' | 'big';

type Props = {
  decimal: Decimal;
  size: Size;
  currency?: JSX.Element;
};

export function Decimal(props: Props) {
  const {
    currency,
    decimal: { integral, fractional },
  } = props;
  const classes = useStyles(props);

  return (
    <Typography className={classes.decimal}>
      {currency}
      {integral}
      <span className={classes.fractional}>.{fractional}</span>
    </Typography>
  );
}

Decimal.defaultProps = {
  size: 'big',
} as Partial<Props>;

const useStyles = makeStyles(() => ({
  decimal: {
    fontSize: ({ size }: Props) => (size === 'big' ? 32 : 16),
    fontWeight: ({ size }: Props) => (size === 'big' ? 300 : 400),
    lineHeight: 'normal',
  },
  fractional: {
    color: '#494972',
  },
}));
