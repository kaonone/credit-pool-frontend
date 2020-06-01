import BN from 'bn.js';

import { formatBalance } from 'utils/format';

import { Token } from './Token';

export class TokenAmount {
  public readonly value: BN;

  constructor(amount: string | BN, public readonly token: Token) {
    this.value = new BN(amount);
  }

  public toFormattedString(precision: number = 2): string {
    return formatBalance({
      amountInBaseUnits: this.value,
      tokenSymbol: this.token.symbol,
      baseDecimals: this.token.decimals,
      precision,
    });
  }

  public withToken(newToken: Token): TokenAmount {
    return new TokenAmount(this.value, newToken);
  }

  public withValue(newValue: string | BN): TokenAmount {
    return new TokenAmount(newValue, this.token);
  }

  public sub(value: BN | TokenAmount): TokenAmount {
    return new TokenAmount(this.value.sub(toBN(value)), this.token);
  }

  public add(value: BN | TokenAmount): TokenAmount {
    return new TokenAmount(this.value.add(toBN(value)), this.token);
  }

  public isZero(): boolean {
    return this.value.isZero();
  }

  public gtn(value: number): boolean {
    return this.value.gtn(value);
  }

  public toString(base?: number | 'hex' | undefined, length?: number | undefined): string {
    return this.value.toString(base, length);
  }
}

function toBN(valueOrAmount: BN | TokenAmount): BN {
  return BN.isBN(valueOrAmount) ? valueOrAmount : valueOrAmount.value;
}
