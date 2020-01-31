import BN from 'bn.js';

import { useApi } from 'services/api';
import { Token, ITokenInfo } from 'model/types';
import { formatBalance } from 'utils/format';

import { useSubscribable, ISubscriptionMeta } from './useSubscribable';

type FormattedBalance = {
  formattedBalance: string;
  notRoundedBalance: string;
};

export function useFormattedBalance(
  token: Token,
  value: string | BN,
  precision: number = 2,
): [FormattedBalance, ISubscriptionMeta] {
  const api = useApi();
  const [tokenInfo, tokenInfoMeta] = useSubscribable(() => api.tokens.getTokenInfo$(token), [
    token,
  ]);

  return [
    (tokenInfo && {
      formattedBalance: getFormattedBalance(value.toString(), tokenInfo, precision),
      notRoundedBalance: getFormattedBalance(value.toString(), tokenInfo, tokenInfo.decimals),
    }) || {
      formattedBalance: '⏳',
      notRoundedBalance: '⏳',
    },
    tokenInfoMeta,
  ];
}

const getFormattedBalance = (value: string | BN, tokenInfo: ITokenInfo, precision?: number) =>
  formatBalance({
    amountInBaseUnits: value,
    baseDecimals: tokenInfo.decimals,
    tokenSymbol: tokenInfo.symbol,
    precision: precision || 2,
  });
