import BN from 'bn.js';

import { IToBN, Decimal } from 'model/types';
import { bnToBn } from 'utils/bn';
import { getDecimal } from 'utils/format';

export class Fraction implements IToBN {
  public readonly numerator: BN;
  public readonly denominator: BN;

  constructor(numerator: string | BN | IToBN, denominator: string | BN | IToBN = new BN(1)) {
    this.numerator = bnToBn(numerator);
    this.denominator = bnToBn(denominator);
  }

  static isFraction(value: unknown): value is Fraction {
    return value instanceof Fraction;
  }

  toBN() {
    return this.numerator.div(this.denominator);
  }

  public toDecimal(baseDecimals: number, precision: number): Decimal {
    const multiplier = new BN(10).pow(new BN(precision));
    return getDecimal(
      this.numerator.mul(multiplier).div(this.denominator).toString(),
      baseDecimals + precision,
      precision,
    );
  }

  add(value: Fraction | BN | IToBN) {
    const { denominator, numerator } = toFraction(value);
    return new Fraction(
      this.numerator.mul(denominator).add(numerator.mul(this.denominator)),
      this.denominator.mul(denominator),
    );
  }

  sub(value: Fraction | BN | IToBN) {
    const { denominator, numerator } = toFraction(value);
    return new Fraction(
      this.numerator.mul(denominator).sub(numerator.mul(this.denominator)),
      this.denominator.mul(denominator),
    );
  }

  div(value: Fraction | BN | IToBN) {
    const { denominator, numerator } = toFraction(value);
    return new Fraction(this.numerator.mul(denominator), this.denominator.mul(numerator));
  }

  divn(value: number) {
    return new Fraction(this.numerator, this.denominator.muln(value));
  }

  mul(value: Fraction | BN | IToBN) {
    const { denominator, numerator } = toFraction(value);
    return new Fraction(this.numerator.mul(numerator), this.denominator.mul(denominator));
  }

  muln(value: number) {
    return new Fraction(this.numerator.muln(value), this.denominator);
  }

  gt(value: Fraction | BN | IToBN): boolean {
    const { denominator, numerator } = toFraction(value);
    return this.numerator.mul(denominator).gt(numerator.mul(this.denominator));
  }

  gtn(value: number): boolean {
    return this.numerator.gt(this.denominator.muln(value));
  }

  isZero() {
    return this.numerator.isZero();
  }
}

function toFraction(value: Fraction | BN | IToBN): Fraction {
  if (value instanceof Fraction) {
    return value;
  }
  return new Fraction(bnToBn(value));
}
