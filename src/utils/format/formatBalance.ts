import BN from 'bn.js';

import { bnToBn } from 'utils/bn/bnToBn';

import { formatDecimal } from './formatDecimal';

interface IformatBalanceOptions {
  amountInBaseUnits: string | BN;
  baseDecimals: number;
  tokenSymbol?: string;
}

export function formatBalance({
  amountInBaseUnits,
  baseDecimals,
  tokenSymbol = '',
}: IformatBalanceOptions): string {
  let balanceString = bnToBn(amountInBaseUnits).toString();

  if (balanceString.length === 0 || balanceString === '0') {
    return '0';
  }

  const isNegative = balanceString[0].startsWith('-');

  if (isNegative) {
    balanceString = balanceString.substr(1);
  }

  const mid = balanceString.length - baseDecimals;
  const prefix = balanceString.substr(0, mid);
  const padding = mid < 0 ? 0 - mid : 0;
  const decimalsZerosLength = baseDecimals < 2 ? baseDecimals : 2;

  const postfix = `${`${'0'.repeat(padding)}${balanceString}`.substr(mid < 0 ? 0 : mid)}000`.substr(
    0,
    decimalsZerosLength,
  );

  return `${isNegative ? '-' : ''}${formatDecimal(prefix || '0')}${
    baseDecimals ? `.${postfix}` : ''
  } ${tokenSymbol.trimEnd()}`;
}
