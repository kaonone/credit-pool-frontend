import React from 'react';

import { TokenAmount } from 'model/entities';
import { FormattedAmount } from 'components/FormattedAmount/FormattedAmount';
import { makeStyles } from 'utils/styles';
import { TokenIcon, tokenIcons } from 'components/TokenIcon/TokenIcon';

interface Props {
  sum: TokenAmount;
}

export function FormattedTokenAmount({ sum }: Props) {
  const classes = useStyles();
  const tokenAddress = sum.currency.address;
  const hasIcon = tokenIcons[tokenAddress] !== undefined;

  return (
    <span className={classes.root}>
      <FormattedAmount sum={sum} variant="plain" hideSymbol={hasIcon} />
      {hasIcon && (
        <span className={classes.tokenIcon}>
          <TokenIcon tokenAddress={tokenAddress} />
        </span>
      )}
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
      display: 'flex',
    },
  }),
  { name: 'FormattedTokenAmount' },
);
