import BN from 'bn.js';

import { useApi } from 'services/api';
import { Token } from 'model/types';

import { useSubscribable, ISubscriptionMeta } from './useSubscribable';

export function useBalanceInWei(
  token: Token,
  value: string | BN,
  isWei: boolean = true,
): [string, ISubscriptionMeta] {
  const api = useApi();
  const [tokenInfo, tokenInfoMeta] = useSubscribable(() => api.tokens.getTokenInfo$(token), [
    token,
  ]);

  return [
    (tokenInfo && getBalanceInWei(isWei, value.toString(), tokenInfo.symbol, tokenInfo.decimals)) ||
      '⏳',
    tokenInfoMeta,
  ];
}

const getBalanceInWei = (isWei: boolean, value: string, symbol: string, decimals: number) =>
  isWei ? `${value} ${symbol}` : `${value}${'0'.repeat(decimals - value.length)} ${symbol}`;
