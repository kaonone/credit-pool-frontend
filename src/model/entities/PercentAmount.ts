import BN from 'bn.js';

import { formatBalance } from 'utils/format';
import { IToBN, IToFraction } from 'model/types';

import { Amount } from './Amount';
import { Currency } from './Currency';
import { Fraction } from './Fraction';

const uniqType = Symbol('PercentAmount');

export class PercentAmount extends Amount<Currency> {
  public _type: typeof uniqType = uniqType;

  constructor(amount: string | BN | IToBN | Fraction | IToFraction) {
    super(amount, new Currency('%', 0));
  }

  // eslint-disable-next-line class-methods-use-this
  public makeAmount(amount: string | BN | IToBN | IToFraction): this {
    return new PercentAmount(amount) as this;
  }

  public toFormattedString(precision: number = 2, withSymbol = true): string {
    const multiplier = new BN(10).pow(new BN(precision));
    const value = this.toFraction().mul(multiplier);

    return formatBalance({
      amountInBaseUnits: value.toBN(),
      tokenSymbol: withSymbol ? this.currency.symbol : undefined,
      baseDecimals: precision,
      precision,
      symbolPosition: 'end',
    });
  }
}
