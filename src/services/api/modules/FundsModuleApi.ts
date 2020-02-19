import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { memoize } from 'utils/decorators';
import { createFundsModule } from 'generated/contracts';
import { ETH_NETWORK_CONFIG } from 'env';
import { decimalsToWei } from 'utils/bn';

import { TokensApi } from './TokensApi';
import { CurveModuleApi } from './CurveModuleApi';
import { Contracts, Web3ManagerModule } from '../types';

export class FundsModuleApi {
  private readonlyContract: Contracts['fundsModule'];
  private txContract = new BehaviorSubject<null | Contracts['fundsModule']>(null);

  constructor(
    private web3Manager: Web3ManagerModule,
    private curveModuleApi: CurveModuleApi,
    private tokensApi: TokensApi,
  ) {
    this.readonlyContract = createFundsModule(
      this.web3Manager.web3,
      ETH_NETWORK_CONFIG.contracts.fundsModule,
    );

    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 => txWeb3 && createFundsModule(txWeb3, ETH_NETWORK_CONFIG.contracts.fundsModule),
        ),
      )
      .subscribe(this.txContract);
  }

  @memoize(R.identity)
  @autobind
  public getMaxWithdrawAmountInDai$(address: string): Observable<BN> {
    return this.tokensApi
      .getBalance$('ptk', address)
      .pipe(switchMap(balance => this.getUserWithdrawAmountInDai$(balance.toString())));
  }

  @memoize(R.identity)
  @autobind
  public getUserWithdrawAmountInDai$(fullWithdrawAmountInPtk: string): Observable<BN> {
    return this.getPtkToDaiExitInfo$(fullWithdrawAmountInPtk).pipe(map(({ user }) => user));
  }

  @memoize(R.identity)
  @autobind
  public getPtkBalanceInDaiWithoutFee$(address: string): Observable<BN> {
    return this.tokensApi.getBalance$('ptk', address).pipe(
      switchMap(balance => this.getPtkToDaiExitInfo$(balance.toString())),
      map(item => item.total),
    );
  }

  @memoize(R.identity)
  @autobind
  public getPtkBalanceInDaiWithFee$(address: string): Observable<BN> {
    return this.tokensApi.getBalance$('ptk', address).pipe(
      switchMap(balance => this.getPtkToDaiExitInfo$(balance.toString())),
      map(item => item.user),
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
  public convertPtkToDaiForLocked$(value: string): Observable<BN> {
    return combineLatest([
      this.tokensApi.getTokenInfo$('dai'),
      this.tokensApi.getTokenInfo$('ptk'),
    ]).pipe(
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
  public convertDaiToPtkEnter$(value: string): Observable<BN> {
    return this.readonlyContract.methods.calculatePoolEnter(
      { lAmount: new BN(value) },
      { Status: {} },
    );
  }

  @memoize(R.identity)
  @autobind
  public convertDaiToPtkExit$(value: string): Observable<BN> {
    return this.readonlyContract.methods.calculatePoolExit(
      { lAmount: new BN(value) },
      { Status: {} },
    );
  }

  @memoize(R.identity)
  @autobind
  public getPtkToDaiExitInfo$(value: string): Observable<{ total: BN; user: BN; fee: BN }> {
    return this.readonlyContract.methods
      .calculatePoolExitInverse({ pAmount: new BN(value) }, { Status: {} })
      .pipe(
        map(([total, user, fee]) => ({
          total,
          user,
          fee,
        })),
      );
  }

  // TODO Check after contracts updating
  /**
   * Calculates how much the available balance of the user will increase after the return of illiquid funds
   * @param address user address for getting current PTK balance
   * @param additionalPtkBalance how many tokens increase the balance
   * @param additionalLiquidity how much illiquid funds will be returned to liquidity
   */
  @memoize(R.identity)
  @autobind
  public getAvailableBalanceIncreasing$(
    address: string,
    additionalPtkBalance: string,
    additionalLiquidity: string,
  ): Observable<BN> {
    return combineLatest([
      this.tokensApi.getBalance$('ptk', address),
      this.getCurrentLiquidity$(),
    ]).pipe(
      switchMap(([ptkBalance, currentLiquidity]) =>
        combineLatest([
          this.curveModuleApi.calculateExitInverse$(
            currentLiquidity.toString(),
            ptkBalance.toString(),
          ),
          this.curveModuleApi.calculateExitInverse$(
            currentLiquidity.add(new BN(additionalLiquidity)).toString(),
            ptkBalance.add(new BN(additionalPtkBalance)).toString(),
          ),
        ]).pipe(map(([currentInfo, increasedInfo]) => increasedInfo.user.sub(currentInfo.user))),
      ),
    );
  }

  @memoize()
  @autobind
  public getCurrentLiquidity$(): Observable<BN> {
    return this.readonlyContract.methods.lBalance(undefined, { Status: {} });
  }
}
