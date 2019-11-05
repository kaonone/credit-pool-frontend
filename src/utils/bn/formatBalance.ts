import BN from 'bn.js';

import { SI, findSi, calcSi } from './si';
import { bnToBn } from './bnToBn';
import { formatDecimal } from './formatDecimal';

interface IFormatBalanceOptions {
  amountInBaseUnits: string | BN;
  baseDecimals: number;
  tokenSymbol: string;
}

export function formatBalance({
  amountInBaseUnits,
  baseDecimals,
  tokenSymbol,
}: IFormatBalanceOptions): string {
  let balanceString = bnToBn(amountInBaseUnits).toString();

  if (balanceString.length === 0 || balanceString === '0') {
    return '0';
  }

  const isNegative = balanceString[0].startsWith('-');

  if (isNegative) {
    balanceString = balanceString.substr(1);
  }

  const si = calcSi(balanceString, baseDecimals);
  const mid = balanceString.length - (baseDecimals + si.power);
  const prefix = balanceString.substr(0, mid);
  const padding = mid < 0 ? 0 - mid : 0;

  const postfix = `${`${new Array(padding + 1).join('0')}${balanceString}`.substr(
    mid < 0 ? 0 : mid,
  )}000`.substr(0, 3);

  const units = si.value === '-' ? ` ${si.text}` : `${si.value} ${findSi(tokenSymbol).text}`;

  return `${isNegative ? '-' : ''}${formatDecimal(prefix || '0')}.${postfix}${units}`;
}

formatBalance.getOptions = (baseDecimals: number) => {
  return SI.filter(({ power }): boolean => (power < 0 ? baseDecimals + power >= 0 : true));
};
