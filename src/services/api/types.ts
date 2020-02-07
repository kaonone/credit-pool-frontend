import PromiEvent from 'web3/promiEvent';
import BN from 'bn.js';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

import {
  createErc20,
  createFundsModule,
  createLiquidityModule,
  createLoanModule,
  createCurveModule,
} from 'generated/contracts';

export type Contracts = {
  dai: ReturnType<typeof createErc20>;
  ptk: ReturnType<typeof createErc20>;
  fundsModule: ReturnType<typeof createFundsModule>;
  liquidityModule: ReturnType<typeof createLiquidityModule>;
  loanModule: ReturnType<typeof createLoanModule>;
  curveModule: ReturnType<typeof createCurveModule>;
};

export type SubmittedTransaction =
  | IGenericSubmittedTransaction<'dai.approve', { spender: string; fromAddress: string; value: BN }>
  | IGenericSubmittedTransaction<'liquidity.sellPtk', { address: string; sourceAmount: BN }>
  | IGenericSubmittedTransaction<'liquidity.buyPtk', { address: string; sourceAmount: BN }>
  | IGenericSubmittedTransaction<'loan.addPledge', { address: string; sourceAmount: BN }>
  | IGenericSubmittedTransaction<
      'loan.createProposal',
      { address: string; sourceAmount: BN; apr: string; description: string }
    >
  | IGenericSubmittedTransaction<'loan.executeProposal', { address: string; proposalId: string }>
  | IGenericSubmittedTransaction<'loan.repay', { address: string; debtId: string; amount: BN }>;

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

export interface Web3ManagerModule {
  web3: Web3;
  txWeb3: BehaviorSubject<Web3 | null>;
}
