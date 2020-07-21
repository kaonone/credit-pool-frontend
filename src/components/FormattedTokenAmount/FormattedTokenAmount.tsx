import React from 'react';

import { TokenAmount } from 'model/entities';
import { DAIIcon, USDCIcon, USDTIcon, TUSDIcon } from 'components/icons';
import { FormattedAmount } from 'components/FormattedAmount/FormattedAmount';
import { makeStyles } from 'utils/styles';

interface Props {
  sum: TokenAmount;
}

type TokenType = 'DAI' | 'USDC' | 'USDT' | 'TUSD';

const tokenIcons: { [P in TokenType]: JSX.Element } = {
  DAI: <DAIIcon />,
  USDC: <USDCIcon />,
  USDT: <USDTIcon />,
  TUSD: <TUSDIcon />,
};

export function FormattedTokenAmount({ sum }: Props) {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <FormattedAmount sum={sum} theme="plain" hideSymbol />
      &nbsp;
      <span className={classes.tokenIcon}>{tokenIcons[sum.currency.symbol as TokenType]}</span>
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
