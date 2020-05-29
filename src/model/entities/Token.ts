export class Token {
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
}

interface TokenJSONView {
  _type: 'Token';
  address: string;
  symbol: string;
  decimals: number;
}
