import BN from 'bn.js';

import { useApi } from 'services/api';
import { TokenType, IToBN } from 'model/types';
import { formatBalance } from 'utils/format';
import { Token } from 'model/entities';
import { ETH_NETWORK_CONFIG } from 'env';

import { useSubscribable, ISubscriptionMeta } from './useSubscribable';

type FormattedBalance = {
  formattedBalance: string;
  notRoundedBalance: string;
};

const addressByToken: Record<TokenType, string> = {
  dai: ETH_NETWORK_CONFIG.contracts.dai,
  ptk: ETH_NETWORK_CONFIG.contracts.ptk,
};

export function useFormattedBalance(
  tokenType: TokenType,
  value: string | BN | IToBN,
  precision: number = 2,
  variant: 'short' | 'long' = 'long',
): [FormattedBalance, ISubscriptionMeta] {
  const api = useApi();
  const [token, tokenMeta] = useSubscribable(() => api.erc20.getToken$(addressByToken[tokenType]), [
    tokenType,
  ]);

  return [
    (token && {
      formattedBalance: getFormattedBalance(value, token, precision, variant),
      notRoundedBalance: getFormattedBalance(value, token, token.decimals, variant),
    }) || {
      formattedBalance: '⏳',
      notRoundedBalance: '⏳',
    },
    tokenMeta,
  ];
}

const getFormattedBalance = (
  value: string | BN | IToBN,
  token: Token,
  precision: number,
  variant: 'short' | 'long',
) =>
  formatBalance({
    amountInBaseUnits: value,
    baseDecimals: token.decimals,
    tokenSymbol: token.symbol,
    precision: precision || 2,
    variant,
  });
