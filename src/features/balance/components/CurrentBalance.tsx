import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { FormattedBalance } from 'components';

import { useStyles } from './CurrentBalance.style';

export type BalanceValue = Pick<React.ComponentProps<typeof FormattedBalance>, 'sum' | 'token'> & {
  color: string;
  label: string;
};

type Props = {
  balanceValues: BalanceValue[];
};

export function CurrentBalance({ balanceValues }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {balanceValues.map(({ sum, token, color, label }, index) => (
        <div key={index} className={classes.balance} style={{ color }}>
          <Typography className={classes.sum} component="div">
            <FormattedBalance sum={sum} token={token} />
          </Typography>
          <div className={classes.label}>
            <Typography className={classes.labelText} component="span">
              {label}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}
