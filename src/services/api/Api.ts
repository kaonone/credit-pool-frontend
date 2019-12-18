import { Observable, ReplaySubject, BehaviorSubject, of } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import PromiEvent from 'web3/promiEvent';
import { Web3WalletsManager } from 'web3-wallets-kit';
import { autobind } from 'core-decorators';

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

const INFURA_ID = '6d0d9f2e41224239b3dce04146c256df';

export class Api {
  public web3Manager = new Web3WalletsManager({
    network: 'kovan',
    infuraAccessToken: INFURA_ID,
    walletConfigs: {
      'wallet-connect': {
        infuraId: INFURA_ID,
        chainId: 42,
      },
      bitski: {
        clientId: '45e6d1b2-f059-4ebd-8afc-3c1cfa0262a4',
        redirectUri: 'http://localhost:8080/bitski-callback.html',
      },
    },
  });

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

  @autobind
  public async sellPtk$(
    address: string,
    values: { sourceAmount: BN; targetAmount: BN },
  ): Promise<void> {
    this.sendMockTransaction$('pool.sellPtk', { address, ...values });
  }

  @autobind
  public async buyPtk$(
    address: string,
    values: { sourceAmount: BN; targetAmount: BN },
  ): Promise<void> {
    this.sendMockTransaction$('pool.buyPtk', { address, ...values });
  }

  @autobind
  public async stakePtk$(
    address: string,
    values: { sourceAmount: BN; targetAmount: BN },
  ): Promise<void> {
    this.sendMockTransaction$('pool.stakePtk', { address, ...values });
  }

  @autobind
  public async getLoan$(
    address: string,
    values: { sourceAmount: BN; targetAmount: BN; apr: string; description: string },
  ): Promise<void> {
    this.sendMockTransaction$('pool.getLoan', { address, ...values });
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

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public getPtkBalance$(_address: string): Observable<BN> {
    return of(new BN('2000000000000000000')).pipe(delay(5000));
  }

  @memoize(R.identity)
  @autobind
  public getMaxAvailableLoanSize$(address: string): Observable<BN> {
    return this.getBalance$('ptk', address).pipe(
      switchMap(balance => {
        return this.getDaiByPToken$(balance.muln(2).toString());
      }),
    );
  }

  @memoize(R.identity)
  @autobind
  public getBalance$(token: 'ptk' | 'dai', address: string): Observable<BN> {
    return token === 'ptk' ? this.getPtkBalance$(address) : this.getDaiBalance$(address);
  }

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getPTokenByDai$(value: string): Observable<BN> {
    return of(new BN(value).muln(2)).pipe(delay(2000));
  }

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getDaiByPToken$(value: string): Observable<BN> {
    return of(new BN(value).muln(0.5)).pipe(delay(2000));
  }

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getDaiToLoanCollateral$(value: string): Observable<BN> {
    return of(new BN(value).muln(0.5)).pipe(delay(2000));
  }

  @autobind
  private async sendMockTransaction$<T extends SubmittedTransactionType>(
    transactionName: T,
    payload: ExtractSubmittedTransaction<T>['payload'],
  ): Promise<void> {
    const promiEvent = new Promise(resolve =>
      setTimeout(() => {
        resolve();
        // eslint-disable-next-line no-console
        console.log(`Send transaction ${transactionName}`, payload);
      }, 1000),
    );

    (promiEvent as any).on = () => {};

    this.pushToSubmittedTransactions$(transactionName, promiEvent as PromiEvent<boolean>, payload);

    await promiEvent;
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
