import BN from 'bn.js';

// TODO remove this
export type TokenType = 'dai' | 'ptk';

export const repaymentMethods = ['fromOwnBalance', 'fromAvailablePoolBalance'] as const;

export type RepaymentMethod = typeof repaymentMethods[number];

export const withdrawMethods = ['availableBalance', 'defiYield'] as const;

export type WithdrawMethod = typeof withdrawMethods[number];

export interface ICurrency {
  readonly symbol: string;
  readonly decimals: number;
  toJSON(): { _type: string };
  equals(a: this): boolean;
}

export interface IBrand {
  _type: symbol;
}

export interface IToBN {
  toBN(): BN;
}

export function isToBN(value: unknown): value is IToBN {
  return typeof value === 'object' && !!value && 'toBN' in value;
}
