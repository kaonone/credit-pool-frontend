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
  IGenericSubmittedTransaction,
  SubmittedTransactionType,
  ExtractSubmittedTransaction,
} from './types';

export class Api {
  private dai = createErc20(this.web3, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea');

  private submittedTransactions = new ReplaySubject<
    IGenericSubmittedTransaction<SubmittedTransactionType, any>
  >();

  constructor(private web3: Web3) {}

  public getEthAccount$(): Observable<string | null> {
    return from(getAccount(this.web3)).pipe(
      skipWhile(account => !account),
      switchMap(() => interval(1000).pipe(switchMap(() => getAccount(this.web3)))),
    );
  }

  public async transferDai$(fromAddress: string, address: string, value: BN): Promise<void> {
    const promiEvent = this.dai.methods.transfer(
      { _to: address, _value: value },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('dai.transfer', promiEvent, { fromAddress, address, value });

    await promiEvent;
  }

  public async approveDai$(spender: string, fromAddress: string, value: BN): Promise<void> {
    const promiEvent = this.dai.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('dai.approve', promiEvent, { spender, fromAddress, value });

    await promiEvent;
  }

  public getSubmittedTransactions$() {
    return this.submittedTransactions;
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
    const promise: Promise<string> = new Promise(() => promiEvent.on('transactionHash', tx => tx));
    this.submittedTransactions.next({ type: transactionName, tx: promise, promiEvent, payload });
  }
}
