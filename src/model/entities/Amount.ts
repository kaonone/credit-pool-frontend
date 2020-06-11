import BN from 'bn.js';

import { ICurrency, IToBN } from 'model/types';
import { bnToBn } from 'utils/bn';

export abstract class Amount<C extends ICurrency> implements IToBN {
  public abstract _type: symbol;
  public readonly value: BN;

  constructor(amount: string | BN | IToBN, public readonly currency: C) {
    this.value = bnToBn(amount);
  }

  public abstract makeAmount(amount: string | BN, currency: C): this;
  public abstract toFormattedString(precision?: number): string;

  public withValue(newValue: string | BN | IToBN): this {
    return this.makeAmount(bnToBn(newValue), this.currency);
  }

  public sub(value: BN | Amount<C>): this {
    return this.makeAmount(this.value.sub(toBN(value)), this.currency);
  }

  public add(value: BN | Amount<C>): this {
    return this.makeAmount(this.value.add(toBN(value)), this.currency);
  }

  public div(value: BN | Amount<C>): this {
    return this.makeAmount(this.value.div(toBN(value)), this.currency);
  }

  public divn(value: number): this {
    return this.makeAmount(this.value.divn(value), this.currency);
  }

  public mul(value: BN | Amount<C>): this {
    return this.makeAmount(this.value.mul(toBN(value)), this.currency);
  }

  public muln(value: number): this {
    return this.makeAmount(this.value.muln(value), this.currency);
  }

  public isZero(): boolean {
    return this.value.isZero();
  }

  public gt(value: BN | Amount<C>): boolean {
    return this.value.gt(toBN(value));
  }

  public gtn(value: number): boolean {
    return this.value.gtn(value);
  }

  public toBN(): BN {
    return this.value;
  }

  public toNumber(): number {
    return this.value.toNumber();
  }

  public toString(base?: number | 'hex' | undefined, length?: number | undefined): string {
    return this.value.toString(base, length);
  }
}

function toBN(valueOrAmount: BN | Amount<ICurrency>): BN {
  return BN.isBN(valueOrAmount) ? valueOrAmount : valueOrAmount.value;
}
