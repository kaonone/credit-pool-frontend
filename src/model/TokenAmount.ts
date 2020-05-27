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
}
