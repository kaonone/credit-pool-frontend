import BN from 'bn.js';

import { ICurrency, IToBN, IToFraction } from 'model/types';
import { bnToBn } from 'utils/bn';

import { Fraction } from './Fraction';

export abstract class Amount<C extends ICurrency> implements IToBN, IToFraction {
  public abstract _type: symbol;
  private value: Fraction;

  constructor(amount: string | BN | IToBN | IToFraction, public readonly currency: C) {
    this.value = toFraction(amount);
  }

  public abstract makeAmount(amount: string | BN | IToBN | IToFraction, currency: C): this;
  public abstract toFormattedString(precision?: number): string;

  public withValue(newValue: string | BN | IToBN): this {
    return this.makeAmount(bnToBn(newValue), this.currency);
  }

  public sub(value: BN | IToBN | IToFraction): this {
    return this.makeAmount(this.value.sub(toFraction(value)), this.currency);
  }

  public add(value: BN | IToBN | IToFraction): this {
    return this.makeAmount(this.value.add(toFraction(value)), this.currency);
  }

  public div(value: BN | IToBN | IToFraction): this {
    return this.makeAmount(this.value.div(toFraction(value)), this.currency);
  }

  public divn(value: number): this {
    return this.makeAmount(this.value.divn(value), this.currency);
  }

  public mul(value: BN | IToBN | IToFraction): this {
    return this.makeAmount(this.value.mul(toFraction(value)), this.currency);
  }

  public muln(value: number): this {
    return this.makeAmount(this.value.muln(value), this.currency);
  }

  public isZero(): boolean {
    return this.value.isZero();
  }

  // TODO make allowance for currency.decimals
  public gt(value: BN | IToBN | IToFraction): boolean {
    return this.value.gt(toFraction(value));
  }

  // TODO make allowance for currency.decimals
  public gtn(value: number): boolean {
    return this.value.gtn(value);
  }

  public toBN(): BN {
    return this.value.toBN();
  }

  public toFraction(): Fraction {
    return this.value;
  }

  public toNumber(): number {
    return this.toBN().toNumber();
  }

  public toString(base?: number | 'hex' | undefined, length?: number | undefined): string {
    return this.toBN().toString(base, length);
  }
}

function toFraction(value: string | BN | IToBN | IToFraction): Fraction {
  if (typeof value === 'string' || BN.isBN(value) || 'toBN' in value) {
    return new Fraction(value);
  }
  return value.toFraction();
}
