import { Observable, ReplaySubject, from, interval } from 'rxjs';
import { skipWhile, switchMap } from 'rxjs/operators';
import Web3 from 'web3';
import BN from 'bn.js';
import * as R from 'ramda';
import PromiEvent from 'web3/promiEvent';

import { createErc20 } from 'utils/contracts';
import { getAccount } from 'utils/ethereum';
import { memoize } from 'utils/decorators';

import {
  SubmittedTransaction,
  SubmittedTransactionType,
  ExtractSubmittedTransaction,
} from './types';

export class Api {
  private dai = createErc20(this.web3, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea');

  private submittedTransaction = new ReplaySubject<SubmittedTransaction>();

  constructor(private web3: Web3) {}

  public getEthAccount$(): Observable<string | null> {
    return from(getAccount(this.web3)).pipe(
      skipWhile(account => !account),
      switchMap(() => interval(1000).pipe(switchMap(() => getAccount(this.web3)))),
    );
  }

  public async transferDai$(fromAddress: string, toAddress: string, value: BN): Promise<void> {
    const promiEvent = this.dai.methods.transfer(
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
    const promiEvent = this.dai.methods.approve(
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
