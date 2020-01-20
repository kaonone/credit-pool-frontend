import PromiEvent from 'web3/promiEvent';
import BN from 'bn.js';

export type SubmittedTransaction =
  | IGenericSubmittedTransaction<
      'dai.transfer',
      { fromAddress: string; toAddress: string; value: BN }
    >
  | IGenericSubmittedTransaction<'dai.approve', { spender: string; fromAddress: string; value: BN }>
  | IGenericSubmittedTransaction<'ptk.approve', { spender: string; fromAddress: string; value: BN }>
  | IGenericSubmittedTransaction<'liquidity.sellPtk', { address: string; sourceAmount: BN }>
  | IGenericSubmittedTransaction<'liquidity.buyPtk', { address: string; sourceAmount: BN }>
  | IGenericSubmittedTransaction<'pool.stakePtk', { address: string; sourceAmount: BN }>
  | IGenericSubmittedTransaction<
      'pool.getLoan',
      { address: string; sourceAmount: BN; apr: string; description: string }
    >;

export interface IGenericSubmittedTransaction<T extends string, P = void> {
  type: T;
  payload: P;
  tx: Promise<string>;
  promiEvent: PromiEvent<boolean>;
}

export type SubmittedTransactionType = SubmittedTransaction['type'];

export type ExtractSubmittedTransaction<T extends SubmittedTransactionType> = Extract<
  SubmittedTransaction,
  IGenericSubmittedTransaction<T, any>
>;
