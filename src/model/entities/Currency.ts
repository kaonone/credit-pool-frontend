import { ICurrency, IBrand } from 'model/types';

const uniqType = Symbol('Currency');

export class Currency implements ICurrency, IBrand {
  public _type: typeof uniqType = uniqType;

  constructor(public readonly symbol: string, public readonly decimals: number) {}

  toJSON(): { _type: string } {
    const view: CurrencyJSONView = {
      _type: 'Currency',
      symbol: this.symbol,
      decimals: this.decimals,
    };

    return view;
  }

  equals(a: Currency): boolean {
    return this.symbol === a.symbol && this.decimals === a.decimals;
  }
}

interface CurrencyJSONView {
  _type: 'Currency';
  symbol: string;
  decimals: number;
}
