import React from 'react';

import { TokenAmount } from 'model/entities';
import { DAIIcon, USDCIcon, USDTIcon, TUSDIcon } from 'components/icons';
import { FormattedAmount } from 'components/FormattedAmount/FormattedAmount';
import { makeStyles } from 'utils/styles';
import { ETH_NETWORK_CONFIG } from 'env';

interface Props {
  sum: TokenAmount;
}

const tokenIcons: Record<string, React.ReactNode> = {
  [ETH_NETWORK_CONFIG.tokens.dai.toLowerCase()]: <DAIIcon />,
  [ETH_NETWORK_CONFIG.tokens.usdc.toLowerCase()]: <USDCIcon />,
  [ETH_NETWORK_CONFIG.tokens.usdt.toLowerCase()]: <USDTIcon />,
  [ETH_NETWORK_CONFIG.tokens.tusd.toLowerCase()]: <TUSDIcon />,
};

export function FormattedTokenAmount({ sum }: Props) {
  const classes = useStyles();
  const tokenIcon = tokenIcons[sum.currency.address.toLowerCase()];
  const hasIcon = tokenIcon !== undefined;

  return (
    <span className={classes.root}>
      <FormattedAmount sum={sum} variant="plain" hideSymbol={!hasIcon} />
      {hasIcon && <span className={classes.tokenIcon}>{tokenIcon}</span>}
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
