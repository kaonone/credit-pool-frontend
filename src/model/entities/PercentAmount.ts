import BN from 'bn.js';

import { formatBalance } from 'utils/format';

import { Amount, Value } from './Amount';
import { Currency } from './Currency';

const uniqType = Symbol('PercentAmount');

export class PercentAmount extends Amount<Currency> {
  public _type: typeof uniqType = uniqType;

  constructor(amount: Value) {
    super(amount, new Currency('%', 0));
  }

  // eslint-disable-next-line class-methods-use-this
  public makeAmount(amount: Value): this {
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
