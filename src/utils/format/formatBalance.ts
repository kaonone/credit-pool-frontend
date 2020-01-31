import BN from 'bn.js';

import { bnToBn } from 'utils/bn/bnToBn';

import { formatDecimal } from './formatDecimal';

interface IFormatBalanceOptions {
  amountInBaseUnits: string | BN;
  baseDecimals: number;
  tokenSymbol?: string;
  precision?: number;
}

export function formatBalance({
  amountInBaseUnits,
  baseDecimals,
  tokenSymbol = '',
  precision = 2,
}: IFormatBalanceOptions): string {
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
  const decimalsZerosLength = baseDecimals < precision ? baseDecimals : precision;

  const postfix = `${`${'0'.repeat(padding)}${balanceString}`.substr(mid < 0 ? 0 : mid)}000`.substr(
    0,
    decimalsZerosLength,
  );

  const units = ` ${tokenSymbol}`;

  return `${isNegative ? '-' : ''}${formatDecimal(prefix || '0')}${
    baseDecimals ? `.${postfix}` : ''
  }${units.trimEnd()}`;
}
