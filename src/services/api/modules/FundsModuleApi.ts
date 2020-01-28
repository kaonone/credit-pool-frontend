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
import { Contracts, Web3ManagerModule } from '../types';

export class FundsModuleApi {
  private readonlyContract: Contracts['fundsModule'];
  private txContract = new BehaviorSubject<null | Contracts['fundsModule']>(null);

  constructor(private web3Manager: Web3ManagerModule, private tokensApi: TokensApi) {
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
  public getPtkBalanceInDai$(address: string): Observable<BN> {
    return this.tokensApi
      .getBalance$('ptk', address)
      .pipe(switchMap(balance => this.convertPtkToDaiExit$(balance.toString())));
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
  public convertPtkToDaiExit$(value: string): Observable<BN> {
    return this.getPtkToDaiExitInfo$(value).pipe(map(({ total }) => total));
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
}
