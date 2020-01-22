import { Observable, ReplaySubject, BehaviorSubject, of, combineLatest } from 'rxjs';
import { map, switchMap, first as firstOperator } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import PromiEvent from 'web3/promiEvent';
import { autobind } from 'core-decorators';

import { decimalsToWei } from 'utils/bn';
import { memoize } from 'utils/decorators';
import {
  createErc20,
  createFundsModule,
  createLiquidityModule,
  createLoanModule,
} from 'generated/contracts';
import { Token, ITokenInfo } from 'model/types';
import { ETH_NETWORK_CONFIG, MIN_COLLATERAL_PERCENT_FOR_BORROWER } from 'env';

import {
  Contracts,
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

  private readonlyContracts: Contracts = {
    dai: createErc20(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.dai),
    ptk: createErc20(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.ptk),
    fundsModule: createFundsModule(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.fundsModule),
    loanModule: createLoanModule(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.loanModule),
    liquidityModule: createLiquidityModule(
      this.web3Manager.web3,
      ETH_NETWORK_CONFIG.contracts.liquidityModule,
    ),
  };

  private txContracts = new BehaviorSubject<null | Contracts>(null);

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
              loanModule: createLoanModule(txWeb3, ETH_NETWORK_CONFIG.contracts.loanModule),
              liquidityModule: createLiquidityModule(
                txWeb3,
                ETH_NETWORK_CONFIG.contracts.liquidityModule,
              ),
            },
        ),
      )
      .subscribe(this.txContracts);
  }

  public async transferDai$(fromAddress: string, toAddress: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.txContracts).dai;

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
    const txPtk = getCurrentValueOrThrow(this.txContracts).ptk;

    const promiEvent = txPtk.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('ptk.approve', promiEvent, { spender, fromAddress, value });

    await promiEvent;
  }

  public async approveDai(fromAddress: string, spender: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.txContracts).dai;

    const promiEvent = txDai.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('dai.approve', promiEvent, { spender, fromAddress, value });

    await promiEvent;
  }

  @memoize(R.identity)
  @autobind
  public getTokenInfo$(token: Token): Observable<ITokenInfo> {
    return combineLatest([
      this.readonlyContracts[token].methods.symbol(),
      this.readonlyContracts[token].methods.decimals(),
    ]).pipe(
      map(([tokenSymbol, decimals]) => ({ symbol: tokenSymbol, decimals: decimals.toNumber() })),
    );
  }

  @memoize()
  @autobind
  public getAprDecimals$(): Observable<number> {
    // on the contract, apr is measured in fractions of a unit, so we need to shift the decimals by 2
    const toPercentMultiplierDivider = 2;

    return this.readonlyContracts.loanModule.methods.INTEREST_MULTIPLIER().pipe(
      map(multiplier => {
        // the multiplier is 10^n
        const decimals = multiplier.toString().length - 1 - toPercentMultiplierDivider;
        return Math.max(0, decimals);
      }),
    );
  }

  @autobind
  public async sellPtk$(fromAddress: string, values: { sourceAmount: BN }): Promise<void> {
    const { sourceAmount } = values;
    const txLiquidityModule = getCurrentValueOrThrow(this.txContracts).liquidityModule;

    const pAmount = await first(this.convertDaiToPtkExit$(sourceAmount.toString()));

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
    const txLiquidityModule = getCurrentValueOrThrow(this.txContracts).liquidityModule;

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
  public async stakePtk(
    fromAddress: string,
    values: { sourceAmount: BN; borrower: string; proposalId: string },
  ): Promise<void> {
    const { sourceAmount, borrower, proposalId } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContracts).loanModule;

    const pAmount = await first(this.convertDaiToPtkExit$(sourceAmount.toString()));

    await this.approvePtk(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule, pAmount);

    const promiEvent = txLoanModule.methods.addPledge(
      { borrower, lAmountMin: new BN(0), pAmount, proposal: new BN(proposalId) },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('loan.addPledge', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async createLoanProposal(
    fromAddress: string,
    values: { sourceAmount: BN; apr: string; description: string },
  ): Promise<void> {
    const { sourceAmount, apr } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContracts).loanModule;

    const minLCollateral = await first(
      this.getMinLoanCollateralByDaiInDai$(sourceAmount.toString()),
    );
    const pAmount = await first(this.convertDaiToPtkExit$(minLCollateral.toString()));

    await this.approvePtk(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule, pAmount);

    const promiEvent = txLoanModule.methods.createDebtProposal(
      { debtLAmount: sourceAmount, interest: new BN(apr), lAmountMin: new BN(0), pAmount },
      { from: fromAddress },
    );

    this.pushToSubmittedTransactions$('loan.createProposal', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  public getSubmittedTransaction$() {
    return this.submittedTransaction;
  }

  @memoize((token: 'ptk' | 'dai', address: string) => token + address)
  @autobind
  public getBalance$(token: 'ptk' | 'dai', address: string): Observable<BN> {
    return token === 'ptk' ? this.getPtkBalance$(address) : this.getDaiBalance$(address);
  }

  @memoize(R.identity)
  public getDaiBalance$(address: string): Observable<BN> {
    return this.readonlyContracts.dai.methods.balanceOf(
      { _owner: address },
      { Transfer: [{ filter: { _from: address } }, { filter: { _to: address } }] },
    );
  }

  @memoize(R.identity)
  @autobind
  public getPtkBalance$(address: string): Observable<BN> {
    return this.readonlyContracts.ptk.methods.balanceOf(
      { _owner: address },
      { Transfer: [{ filter: { _from: address } }, { filter: { _to: address } }] },
    );
  }

  @memoize(R.identity)
  @autobind
  public getMaxAvailableLoanSizeInDai$(address: string): Observable<BN> {
    return this.getBalance$('ptk', address).pipe(
      switchMap(balance => {
        return this.convertPtkToDaiExit$(balance.toString());
      }),
      map(item => item.muln(100).divn(MIN_COLLATERAL_PERCENT_FOR_BORROWER)),
    );
  }

  @memoize(R.identity)
  @autobind
  public getPtkBalanceInDai$(address: string): Observable<BN> {
    return this.getPtkBalance$(address).pipe(
      switchMap(balance => this.convertPtkToDaiExit$(balance.toString())),
    );
  }

  @memoize(R.identity)
  @autobind
  public convertDaiToPtkEnter$(value: string): Observable<BN> {
    return this.readonlyContracts.fundsModule.methods.calculatePoolEnter(
      { lAmount: new BN(value) },
      { Status: {} },
    );
  }

  @memoize(R.identity)
  @autobind
  public convertDaiToPtkExit$(value: string): Observable<BN> {
    return this.readonlyContracts.fundsModule.methods.calculatePoolExit(
      { lAmount: new BN(value) },
      { Status: {} },
    );
  }

  @memoize(R.identity)
  @autobind
  public convertPtkToDaiExit$(value: string): Observable<BN> {
    return this.getPtkToDaiExitInfo$(value).pipe(map(({ total }) => total));
  }

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public convertPtkToDaiForLocked$(value: string): Observable<BN> {
    return combineLatest([this.getTokenInfo$('dai'), this.getTokenInfo$('ptk')]).pipe(
      switchMap(([daiInfo, ptkInfo]) =>
        this.convertDaiToPtkEnter$(decimalsToWei(daiInfo.decimals).toString()).pipe(
          map(oneDaiPrice => ({ oneDaiPrice, ptkInfo })),
        ),
      ),
      map(({ oneDaiPrice, ptkInfo }) =>
        new BN(value).mul(decimalsToWei(ptkInfo.decimals)).div(oneDaiPrice),
      ),
    );
  }

  @memoize(R.identity)
  @autobind
  public getPtkToDaiExitInfo$(value: string): Observable<{ total: BN; user: BN; fee: BN }> {
    return this.readonlyContracts.fundsModule.methods
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
  public getDaiToDaiExitInfo$(daiValue: string): Observable<{ total: BN; user: BN; fee: BN }> {
    return this.convertDaiToPtkExit$(daiValue).pipe(
      switchMap(ptkValue => this.getPtkToDaiExitInfo$(ptkValue.toString())),
    );
  }

  @memoize(R.identity)
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getMinLoanCollateralByDaiInDai$(value: string): Observable<BN> {
    return of(new BN(value).muln(MIN_COLLATERAL_PERCENT_FOR_BORROWER).divn(100));
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
