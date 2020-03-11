export type Token = 'dai' | 'ptk';

export interface ITokenInfo {
  decimals: number;
  symbol: string;
}

export const repaymentMethods = ['fromOwnBalance', 'fromAvailablePoolBalance'] as const;

export type RepaymentMethod = typeof repaymentMethods[number];
