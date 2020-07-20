import { Observable, combineLatest, BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { memoize } from 'utils/decorators';
import { createFundsModule } from 'generated/contracts';
import { ETH_NETWORK_CONFIG } from 'env';
import { max } from 'utils/bn';
import { calcWithdrawAmountBeforeFee } from 'model';
import { TokenAmount, Token, Currency, LiquidityAmount } from 'model/entities';
import { IToBN } from 'model/types';

import { Erc20Api } from './Erc20Api';
import { CurveModuleApi } from './CurveModuleApi';
import { Contracts, Web3ManagerModule } from '../types';

export class FundsModuleApi {
  private readonlyContract: Contracts['fundsModule'];
  private txContract = new BehaviorSubject<null | Contracts['fundsModule']>(null);
  private getTotalLProposals$: (() => Observable<BN>) | null = null;
  private getUnpaidInterest$: ((address: string) => Observable<LiquidityAmount>) | null = null;

  constructor(
    private web3Manager: Web3ManagerModule,
    private curveModuleApi: CurveModuleApi,
    private erc20Api: Erc20Api,
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

  public setTotalLProposalGetter(getter: () => Observable<BN>) {
    this.getTotalLProposals$ = getter;
  }

  public setUnpaidInterestGetter(getter: (address: string) => Observable<LiquidityAmount>) {
    this.getUnpaidInterest$ = getter;
  }

  public toLiquidityAmount$(amount$: Observable<BN | IToBN>): Observable<LiquidityAmount>;
  public toLiquidityAmount$(amount$: Observable<Array<BN | IToBN>>): Observable<LiquidityAmount[]>;
  @autobind
  public toLiquidityAmount$(
    amount$: Observable<BN | IToBN | Array<BN | IToBN>>,
  ): Observable<LiquidityAmount | LiquidityAmount[]> {
    return combineLatest([this.getLiquidityCurrency$(), amount$]).pipe(
      map(([currency, amounts]) =>
        Array.isArray(amounts)
          ? amounts.map(amount => new LiquidityAmount(amount, currency))
          : new LiquidityAmount(amounts, currency),
      ),
    );
  }

  @memoize()
  // liquidity token is not an ERC20 token!
  // eslint-disable-next-line class-methods-use-this
  public getLiquidityCurrency$(): Observable<Currency> {
    // TODO take decimals from contract
    return of(new Currency('$', 18));
  }

  @memoize(R.identity)
  public getMaxWithdrawAmount$(address: string): Observable<LiquidityAmount> {
    if (!this.getUnpaidInterest$) {
      throw new Error('Getter for unpaidInterest is not found');
    }

    return combineLatest([this.getUnpaidInterest$(address), this.curveModuleApi.getConfig$()]).pipe(
      switchMap(([unpaidInterestInDai, { percentDivider, withdrawFeePercent }]) =>
        this.convertLiquidityToPtkExit$(
          calcWithdrawAmountBeforeFee({
            percentDivider,
            withdrawFeePercent,
            withdrawAmountAfterFee: unpaidInterestInDai,
          }),
        ),
      ),
      switchMap(unpaidInterestInPtk =>
        this.getAvailableBalance$(address, unpaidInterestInPtk.mul(-1).toString()),
      ),
    );
  }

  @memoize()
  // eslint-disable-next-line class-methods-use-this
  public getSupportedTokens$(): Observable<Token[]> {
    // TODO take from contract
    return of([ETH_NETWORK_CONFIG.contracts.dai]).pipe(
      switchMap(addresses =>
        combineLatest(addresses.map(address => this.erc20Api.getToken$(address))),
      ),
    );
  }

  @memoize(R.identity)
  public getWithdrawingAmountAfterFee$(
    fullWithdrawAmountInPtk: string,
  ): Observable<LiquidityAmount> {
    return this.toLiquidityAmount$(
      this.getPtkToDaiExitInfo$(fullWithdrawAmountInPtk).pipe(map(({ user }) => user)),
    );
  }

  @memoize(R.identity)
  public getPtkBalanceInDaiWithoutFee$(address: string): Observable<BN> {
    return this.erc20Api.getPtkBalance$(address).pipe(
      switchMap(balance => this.getPtkToDaiExitInfo$(balance.toString())),
      map(item => item.total),
    );
  }

  @memoize(R.identity)
  public getPtkBalanceInDaiWithFee$(address: string): Observable<BN> {
    return this.erc20Api.getPtkBalance$(address).pipe(
      switchMap(balance => this.getPtkToDaiExitInfo$(balance.toString())),
      map(item => item.user),
    );
  }

  @memoize(R.identity)
  public convertDaiToPtkEnter$(value: string): Observable<BN> {
    const lAmount = new BN(value);

    return lAmount.isZero()
      ? of(lAmount)
      : this.readonlyContract.methods.calculatePoolEnter(
          { lAmount, liquidityCorrection: new BN(0) },
          this.readonlyContract.events.Status(),
        );
  }

  @memoize((value: LiquidityAmount) => value.toString())
  public convertLiquidityToPtkExit$(value: LiquidityAmount): Observable<TokenAmount> {
    const lAmount = value.toBN();

    return this.erc20Api.toTokenAmount(
      ETH_NETWORK_CONFIG.contracts.ptk,
      lAmount.isZero()
        ? of(lAmount)
        : this.readonlyContract.methods.calculatePoolExit(
            { lAmount },
            this.readonlyContract.events.Status(),
          ),
    );
  }

  @memoize(R.identity)
  public getPtkToDaiExitInfo$(value: string): Observable<{ total: BN; user: BN; fee: BN }> {
    const pAmount = new BN(value);

    return pAmount.isZero()
      ? of({ total: pAmount, user: pAmount, fee: pAmount })
      : this.readonlyContract.methods
          .calculatePoolExitInverse({ pAmount }, this.readonlyContract.events.Status())
          .pipe(
            map(([total, user, fee]) => ({
              total,
              user,
              fee,
            })),
          );
  }

  /**
   * Calculates current available balance of the user with optional corrections
   * @param address user address for getting current PTK balance
   * @param additionalPtkBalance how many tokens increase the balance
   * @param additionalLiquidity how much illiquid funds will be returned to liquidity
   */
  @memoize((...args: string[]) => args.join())
  public getAvailableBalance$(
    address: string,
    additionalPtkBalance: string = '0',
    additionalLiquidity: string = '0',
  ): Observable<LiquidityAmount> {
    return this.toLiquidityAmount$(
      combineLatest([this.erc20Api.getPtkBalance$(address), this.getCurrentLiquidity$()]).pipe(
        switchMap(([ptkBalance, currentLiquidity]) =>
          this.curveModuleApi
            .calculateExitInverse$(
              currentLiquidity.add(new BN(additionalLiquidity)).toString(),
              max(new BN(0), ptkBalance.add(new BN(additionalPtkBalance))).toString(),
            )
            .pipe(map(info => info.user)),
        ),
      ),
    );
  }

  /**
   * Calculates how much the available balance of the user will increase after the return of illiquid funds
   * @param address user address for getting current PTK balance
   * @param additionalPtkBalance how many tokens increase the balance
   * @param additionalLiquidity how much illiquid funds will be returned to liquidity
   */
  @memoize((...args: string[]) => args.join())
  public getAvailableBalanceIncreasing$(
    address: string,
    additionalPtkBalance: string,
    additionalLiquidity: string,
  ): Observable<TokenAmount> {
    return this.erc20Api.toTokenAmount(
      ETH_NETWORK_CONFIG.contracts.dai,
      combineLatest([this.erc20Api.getPtkBalance$(address), this.getCurrentLiquidity$()]).pipe(
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
      ),
    );
  }

  @memoize()
  public getCurrentLiquidity$(): Observable<LiquidityAmount> {
    if (!this.getTotalLProposals$) {
      throw new Error('Getter for totalLProposals is not found');
    }

    return this.toLiquidityAmount$(
      combineLatest([
        this.readonlyContract.methods.lBalance(undefined, this.readonlyContract.events.Status()),
        this.getTotalLProposals$(),
      ]).pipe(map(([liquidity, totalLProposals]) => liquidity.sub(totalLProposals))),
    );
  }

  @memoize()
  public getFundsLBalance$(): Observable<BN> {
    return this.readonlyContract.methods.lBalance(undefined, this.readonlyContract.events.Status());
  }
}
