import React from 'react';
import BN from 'bn.js';

import { LiquidityAmount, Currency } from 'model/entities';

import { AmountInput, AmountInputProps } from './AmountInput';

export type LiquidityAmountInputProps = Omit<
  AmountInputProps<LiquidityAmount>,
  'makeAmount' | 'getCurrencyIdentifier'
>;

export function LiquidityAmountInput(props: LiquidityAmountInputProps) {
  return (
    <AmountInput<LiquidityAmount>
      {...props}
      makeAmount={makeAmount}
      getCurrencyIdentifier={getCurrencyIdentifier}
    />
  );
}

function getCurrencyIdentifier(currency: Currency) {
  return currency.symbol;
}

function makeAmount(value: BN, currency: Currency) {
  return new LiquidityAmount(value, currency);
}
