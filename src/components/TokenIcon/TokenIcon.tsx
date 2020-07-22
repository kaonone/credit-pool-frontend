import React from 'react';
import JazzIcon from 'react-jazzicon';

import { DAIIcon, USDCIcon, USDTIcon, TUSDIcon } from 'components/icons';
import { ETH_NETWORK_CONFIG } from 'env';

type Props = {
  tokenAddress: string;
};

export const tokenIcons: Record<string, React.ReactNode> = {
  [ETH_NETWORK_CONFIG.tokens.dai.toLowerCase()]: <DAIIcon />,
  [ETH_NETWORK_CONFIG.tokens.usdc.toLowerCase()]: <USDCIcon />,
  [ETH_NETWORK_CONFIG.tokens.usdt.toLowerCase()]: <USDTIcon />,
  [ETH_NETWORK_CONFIG.tokens.tusd.toLowerCase()]: <TUSDIcon />,
};

export function TokenIcon({ tokenAddress }: Props) {
  const tokenIcon = tokenIcons[tokenAddress];
  const hasIcon = tokenIcon !== undefined;

  return hasIcon ? <>{tokenIcon}</> : <JazzIcon seed={tokenAddress} />;
}
