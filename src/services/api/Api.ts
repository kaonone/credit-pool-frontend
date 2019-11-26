import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import PromiEvent from 'web3/promiEvent';
import { Web3WalletsManager } from 'web3-wallets-kit';

import { memoize } from 'utils/decorators';
import { createErc20 } from 'generated/contracts/createErc20';

import {
  SubmittedTransaction,
  SubmittedTransactionType,
  ExtractSubmittedTransaction,
} from './types';

function getCurrentValueOrThrow<T>(subject: BehaviorSubject<T | null>): NonNullable<T> {
  const value = subject.getValue();

  if (value === null || value === undefined) {
    throw new Error('Subject is not contain non nullable value');
  }

  return value as NonNullable<T>;
}

export class Api {
  private web3Manager = new Web3WalletsManager();

  private dai = createErc20(this.web3Manager.web3, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea');
  private txDai = new BehaviorSubject<ReturnType<typeof createErc20> | null>(null);

  private submittedTransaction = new ReplaySubject<SubmittedTransaction>();

  constructor() {
    this.web3Manager.txWeb3
      .pipe(
        map(txWeb3 => txWeb3 && createErc20(txWeb3, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea')),
      )
      .subscribe(this.txDai);
  }

  public getEthAccount$(): Observable<string | null> {
    return this.web3Manager.account;
  }

  get connectToWallet() {
    return this.web3Manager.connect;
  }

  get disconnectFromWallet() {
    return this.web3Manager.disconnect;
  }

  public async transferDai$(fromAddress: string, toAddress: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.txDai);

    const promiEvent = txDai.methods.transfer(
      { _to: toAddress, _value: value },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('dai.transfer', promiEvent, {
      fromAddress,
      toAddress,
      value,
    });

    await promiEvent;
  }

  public async approveDai$(fromAddress: string, spender: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.txDai);

    const promiEvent = txDai.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('dai.approve', promiEvent, { spender, fromAddress, value });

    await promiEvent;
  }

  public getSubmittedTransaction$() {
    return this.submittedTransaction;
  }

  @memoize(R.identity)
  public getDaiBalance$(address: string): Observable<BN> {
    return this.dai.methods.balanceOf(
      { _owner: address },
      { Transfer: [{ filter: { _from: address } }, { filter: { _to: address } }] },
    );
  }

  private pushToSubmittedTransactions$<T extends SubmittedTransactionType>(
    transactionName: T,
    promiEvent: PromiEvent<boolean>,
    payload: ExtractSubmittedTransaction<T>['payload'],
  ) {
    const promise = new Promise<string>(resolve =>
      promiEvent.on('transactionHash', tx => resolve(tx)),
    );

    this.submittedTransaction.next({
      type: transactionName as 'dai.transfer',
      tx: promise,
      promiEvent,
      payload,
    });
  }
}
