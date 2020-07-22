import React from 'react';
import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';

import { USDCIcon, USDTIcon, TUSDIcon, DAIIcon } from 'components/icons';
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
  const tokenIcon = tokenIcons[tokenAddress.toLowerCase()];
  const hasIcon = tokenIcon !== undefined;

  return hasIcon ? (
    <>{tokenIcon}</>
  ) : (
    <JazzIcon diameter={20} seed={jsNumberForAddress(tokenAddress)} />
  );
}
