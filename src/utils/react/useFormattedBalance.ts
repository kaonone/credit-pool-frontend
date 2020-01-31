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
  isWei: boolean = true,
  precision?: number,
): [FormattedBalance, ISubscriptionMeta] {
  const api = useApi();
  const [tokenInfo, tokenInfoMeta] = useSubscribable(() => api.tokens.getTokenInfo$(token), [
    token,
  ]);

  return [
    (tokenInfo && {
      formattedBalance: getFormattedBalance(isWei, value.toString(), tokenInfo),
      notRoundedBalance: getFormattedBalance(
        isWei,
        value.toString(),
        tokenInfo,
        precision || tokenInfo.decimals,
      ),
    }) || {
      formattedBalance: '⏳',
      notRoundedBalance: '⏳',
    },
    tokenInfoMeta,
  ];
}

const getValueInWei = (value: string, tokenInfo: ITokenInfo) =>
  `${value}${'0'.repeat(tokenInfo.decimals)}`;

const getFormattedBalance = (
  isWei: boolean,
  value: string,
  tokenInfo: ITokenInfo,
  precision?: number,
) =>
  formatBalance({
    amountInBaseUnits: isWei ? value : getValueInWei(value.toString(), tokenInfo),
    baseDecimals: tokenInfo.decimals,
    tokenSymbol: tokenInfo.symbol,
    precision: precision || 2,
  });
