import BN from 'bn.js';

import { bnToBn } from 'utils/bn/bnToBn';
import { IToBN } from 'model/types';

import { formatDecimal } from './formatDecimal';

type SymbolPosition = 'start-space' | 'start' | 'end-space' | 'end';

interface IFormatBalanceOptions {
  amountInBaseUnits: string | BN | IToBN;
  baseDecimals: number;
  tokenSymbol?: string;
  precision?: number;
  variant?: 'short' | 'long';
  symbolPosition?: SymbolPosition;
}

export function formatBalance({
  amountInBaseUnits,
  baseDecimals,
  tokenSymbol = '',
  precision = 2,
  variant = 'long',
  symbolPosition = 'end-space',
}: IFormatBalanceOptions): string {
  let balanceString = bnToBn(amountInBaseUnits).toString();

  if (balanceString.length === 0 || balanceString === '0') {
    return withUnit('0', { symbolPosition, tokenSymbol });
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

  const long = `${isNegative ? '-' : ''}${formatDecimal(prefix || '0')}${
    baseDecimals && postfix ? `.${postfix}` : ''
  }`;
  const short = long.replace(/^(\d+?\.\d*?)0*$/, '$1').replace(/^(\d+?)\.$/, '$1');

  return withUnit(variant === 'short' ? short : long, { symbolPosition, tokenSymbol }).trim();
}

const unitsGetterByPosition: Record<SymbolPosition, (tokenSymbol: string) => string> = {
  'end-space': tokenSymbol => ` ${tokenSymbol}`,
  end: tokenSymbol => tokenSymbol,
  'start-space': tokenSymbol => `${tokenSymbol} `,
  start: tokenSymbol => tokenSymbol,
};

const startPositions: SymbolPosition[] = ['start', 'start-space'];

function withUnit(
  value: string,
  { symbolPosition, tokenSymbol }: { tokenSymbol: string; symbolPosition: SymbolPosition },
) {
  const isStartUnit = startPositions.includes(symbolPosition);
  const unit = unitsGetterByPosition[symbolPosition](tokenSymbol.trim());
  const raw = isStartUnit ? [unit, value] : [value, unit];

  return raw.join('');
}
