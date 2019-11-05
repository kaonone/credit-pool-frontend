import { toBaseUnit } from 'utils/bn/toBaseUnit';

export const calculateNumberFromDecimals = (
  amount: string,
  decimals: number,
  baseDecimals: number,
) => {
  const totalDecimals = baseDecimals + decimals;
  return toBaseUnit(amount, totalDecimals).toString();
};
