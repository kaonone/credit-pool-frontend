import { isEqualHex } from 'utils/hex';
import { ICurrency, IBrand } from 'model/types';

const uniqType = Symbol('Token');

export class Token implements ICurrency, IBrand {
  public _type: typeof uniqType = uniqType;

  constructor(
    public readonly address: string,
    public readonly symbol: string,
    public readonly decimals: number,
  ) {}

  toJSON() {
    const view: TokenJSONView = {
      _type: 'Token',
      address: this.address,
      symbol: this.symbol,
      decimals: this.decimals,
    };

    return view;
  }

  equals(a: Token): boolean {
    return isEqualHex(this.address, a.address);
  }
}

interface TokenJSONView {
  _type: 'Token';
  address: string;
  symbol: string;
  decimals: number;
}
