import { Decimal } from 'model/types';

export function getDecimal(value: string, baseDecimals: number, precision: number): Decimal {
  if (value.length === 0 || value === '0') {
    return { fractional: '', integer: '0' };
  }

  const isNegative = value[0].startsWith('-');
  const positiveValue = isNegative ? value.substr(1) : value;

  const mid = positiveValue.length - baseDecimals;
  const integer = positiveValue.substr(0, mid);
  const padding = mid < 0 ? 0 - mid : 0;

  const minPrecision =
    baseDecimals - precision > positiveValue.length - 1
      ? baseDecimals - positiveValue.length + 1
      : precision;
  const decimalsZerosLength = baseDecimals < minPrecision ? baseDecimals : minPrecision;

  // TODO: refactor
  const fractional = `${`${'0'.repeat(padding)}${positiveValue}`.substr(
    mid < 0 ? 0 : mid,
  )}000`.substr(0, decimalsZerosLength);

  return { fractional, integer: `${isNegative ? '-' : ''}${integer}` };
}
