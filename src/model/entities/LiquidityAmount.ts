import BN from 'bn.js';

import { formatBalance } from 'utils/format';

import { Amount } from './Amount';
import { Currency } from './Currency';

const uniqType = Symbol('LiquidityAmount type');

export class LiquidityAmount extends Amount<Currency> {
  public _type: typeof uniqType = uniqType;

  // eslint-disable-next-line class-methods-use-this
  public makeAmount(amount: string | BN, currency: Currency): this {
    return new LiquidityAmount(amount, currency) as this;
  }

  public toFormattedString(precision: number = 2): string {
    return formatBalance({
      amountInBaseUnits: this.value,
      tokenSymbol: this.currency.symbol,
      baseDecimals: this.currency.decimals,
      precision,
      symbolPosition: 'start',
    });
  }
}
