import BN from 'bn.js';

import { bnToBn } from 'utils/bn/bnToBn';
import { IToBN } from 'model/types';

import { formatInteger } from './formatInteger';
import { getDecimal } from './getDecimal';

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
  const balanceString = bnToBn(amountInBaseUnits).toString();

  if (balanceString.length === 0 || balanceString === '0') {
    return withUnit('0', { symbolPosition, tokenSymbol });
  }

  const { fractional, integer } = getDecimal(balanceString, baseDecimals, precision);

  const long = `${formatInteger(integer || '0')}${
    baseDecimals && fractional ? `.${fractional}` : ''
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
