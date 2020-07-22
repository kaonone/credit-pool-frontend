import React from 'react';

import { TokenAmount } from 'model/entities';
import { FormattedAmount } from 'components/FormattedAmount/FormattedAmount';
import { makeStyles } from 'utils/styles';
import { TokenIcon } from 'components/TokenIcon/TokenIcon';

interface Props {
  sum: TokenAmount;
}

export function FormattedTokenAmount({ sum }: Props) {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <FormattedAmount sum={sum} variant="plain" hideSymbol />
      <span className={classes.tokenIcon}><TokenIcon tokenAddress={sum.currency.address} /></span>
    </span>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    tokenIcon: {
      marginLeft: 10,
    },
  }),
  { name: 'FormattedTokenAmount' },
);
