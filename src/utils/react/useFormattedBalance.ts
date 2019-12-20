import BN from 'bn.js';

import { ITokenInfo } from 'services/api/types';
import { formatBalance } from 'utils/format';

export function useFormattedBalance(tokenInfo: ITokenInfo, value: string | BN): string {
  return formatBalance({
    amountInBaseUnits: value,
    baseDecimals: tokenInfo.decimals,
    tokenSymbol: tokenInfo.symbol,
  });
}
