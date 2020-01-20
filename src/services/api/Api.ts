import { Observable, ReplaySubject, BehaviorSubject, of } from 'rxjs';
import { map, delay, switchMap, first as firstOperator } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import PromiEvent from 'web3/promiEvent';
import { autobind } from 'core-decorators';

import { memoize } from 'utils/decorators';
import { createErc20, createFundsModule, createLiquidityModule } from 'generated/contracts';
import { Token, ITokenInfo } from 'model/types';
import { ETH_NETWORK_CONFIG } from 'env';

import {
  SubmittedTransaction,
  SubmittedTransactionType,
  ExtractSubmittedTransaction,
} from './types';
import { Web3Manager } from './Web3Manager';

function getCurrentValueOrThrow<T>(subject: BehaviorSubject<T | null>): NonNullable<T> {
  const value = subject.getValue();

  if (value === null || value === undefined) {
    throw new Error('Subject is not contain non nullable value');
  }

  return value as NonNullable<T>;
}

function first<T>(input: Observable<T>): Promise<T> {
  return input.pipe(firstOperator()).toPromise();
}

export class Api {
  public web3Manager = new Web3Manager();

  private dai = createErc20(this.web3Manager.web3, '0xc4375b7de8af5a38a93548eb8453a498222c4ff2');
  private tx = new BehaviorSubject<null | {
    dai: ReturnType<typeof createErc20>;
    ptk: ReturnType<typeof createErc20>;
    fundsModule: ReturnType<typeof createFundsModule>;
    liquidityModule: ReturnType<typeof createLiquidityModule>;
  }>(null);

  private submittedTransaction = new ReplaySubject<SubmittedTransaction>();

  constructor() {
    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && {
              dai: createErc20(txWeb3, ETH_NETWORK_CONFIG.contracts.dai),
              ptk: createErc20(txWeb3, ETH_NETWORK_CONFIG.contracts.ptk),
              fundsModule: createFundsModule(txWeb3, ETH_NETWORK_CONFIG.contracts.fundsModule),
              liquidityModule: createLiquidityModule(
                txWeb3,
                ETH_NETWORK_CONFIG.contracts.liquidityModule,
              ),
            },
        ),
      )
      .subscribe(this.tx);
  }

  public async transferDai$(fromAddress: string, toAddress: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.tx).dai;

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

  public async approvePtk(fromAddress: string, spender: string, value: BN): Promise<void> {
    const txPtk = getCurrentValueOrThrow(this.tx).ptk;

    const promiEvent = txPtk.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('ptk.approve', promiEvent, { spender, fromAddress, value });

    await promiEvent;
  }

  public async approveDai(fromAddress: string, spender: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.tx).dai;

    const promiEvent = txDai.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('dai.approve', promiEvent, { spender, fromAddress, value });

    await promiEvent;
  }

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getTokenInfo$(token: Token): Observable<ITokenInfo> {
    return token === 'dai'
      ? of({
          decimals: 18,
          symbol: 'DAI',
        }).pipe(delay(2000))
      : of({
          decimals: 18,
          symbol: 'PTK',
        }).pipe(delay(2000));
  }

  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getInterestPercentDecimals$(): Observable<number> {
    return of(3);
  }

  @autobind
  public async sellPtk$(fromAddress: string, values: { sourceAmount: BN }): Promise<void> {
    const { sourceAmount } = values;
    const txLiquidityModule = getCurrentValueOrThrow(this.tx).liquidityModule;

    const pAmount = await first(this.getPTokenByDai$(sourceAmount.toString()));

    await this.approvePtk(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule, pAmount);

    const promiEvent = txLiquidityModule.methods.withdraw(
      { lAmountMin: new BN(0), pAmount },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('liquidity.sellPtk', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async buyPtk(fromAddress: string, values: { sourceAmount: BN }): Promise<void> {
    const { sourceAmount } = values;
    const txLiquidityModule = getCurrentValueOrThrow(this.tx).liquidityModule;

    await this.approveDai(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule, sourceAmount);

    const promiEvent = txLiquidityModule.methods.deposit(
      { lAmount: sourceAmount, pAmountMin: new BN(0) },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('liquidity.buyPtk', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async stakePtk$(address: string, values: { sourceAmount: BN }): Promise<void> {
    this.sendMockTransaction$('pool.stakePtk', { address, ...values });
  }

  @autobind
  public async getLoan$(
    address: string,
    values: { sourceAmount: BN; apr: string; description: string },
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
  public getPtkBalanceInDai$(address: string): Observable<BN> {
    return this.getPtkBalance$(address).pipe(
      switchMap(balance => this.getDaiByPToken$(balance.toString())),
    );
  }

  @memoize((token: 'ptk' | 'dai', address: string) => token + address)
  @autobind
  public getBalance$(token: 'ptk' | 'dai', address: string): Observable<BN> {
    return token === 'ptk' ? this.getPtkBalance$(address) : this.getDaiBalance$(address);
  }

  @memoize(R.identity)
  @autobind
  public getPTokenByDai$(value: string): Observable<BN> {
    const txFunds = getCurrentValueOrThrow(this.tx).fundsModule;

    return txFunds.methods.calculatePoolEnter({ lAmount: new BN(value) }, { Status: {} });
  }

  @memoize(R.identity)
  @autobind
  public getDaiByPToken$(value: string): Observable<BN> {
    return this.getWithdrawPTokenInfo$(value).pipe(map(({ total }) => total));
  }

  @memoize(R.identity)
  @autobind
  public getWithdrawPTokenInfo$(value: string): Observable<{ total: BN; user: BN; fee: BN }> {
    const txFunds = getCurrentValueOrThrow(this.tx).fundsModule;

    return txFunds.methods
      .calculatePoolExitInverse({ pAmount: new BN(value) }, { Status: {} })
      .pipe(
        map(([total, user, fee]) => ({
          total,
          user,
          fee,
        })),
      );
  }

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getDaiLoanCollateralByDai$(value: string): Observable<BN> {
    return of(new BN(value).divn(2)).pipe(delay(2000));
  }

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getDaiByPtkForLocked$(value: string): Observable<BN> {
    return of(new BN(value).divn(2)).pipe(delay(2000));
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
    promiEvent: PromiEvent<any>,
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
