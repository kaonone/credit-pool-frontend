import React from 'react';
import BN from 'bn.js';

import { TokenAmount, Token } from 'model/entities';

import { AmountInput, AmountInputProps } from './AmountInput';

export type TokenAmountInputProps = Omit<
  AmountInputProps<TokenAmount>,
  'makeAmount' | 'getCurrencyIdentifier'
>;

export function TokenAmountInput(props: TokenAmountInputProps) {
  return (
    <AmountInput<TokenAmount>
      {...props}
      makeAmount={makeAmount}
      getCurrencyIdentifier={getCurrencyIdentifier}
    />
  );
}

function getCurrencyIdentifier(currency: Token) {
  return currency.address;
}

function makeAmount(value: BN, currency: Token) {
  return new TokenAmount(value, currency);
}
