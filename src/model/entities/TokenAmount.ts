import BN from 'bn.js';

import { formatBalance } from 'utils/format';
import { IToBN, IToFraction } from 'model/types';

import { Token } from './Token';
import { Amount } from './Amount';

const uniqType = Symbol('TokenAmount');

export class TokenAmount extends Amount<Token> {
  public _type: typeof uniqType = uniqType;

  // eslint-disable-next-line class-methods-use-this
  public makeAmount(amount: string | BN | IToBN | IToFraction, token: Token): this {
    return new TokenAmount(amount, token) as this;
  }

  public toFormattedString(precision: number = 2, withSymbol = true): string {
    return formatBalance({
      amountInBaseUnits: this.toBN(),
      tokenSymbol: withSymbol ? this.currency.symbol : undefined,
      baseDecimals: this.currency.decimals,
      precision,
      symbolPosition: 'end-space',
    });
  }

  public withToken(newToken: Token): TokenAmount {
    return new TokenAmount(this.toFraction(), newToken);
  }
}
