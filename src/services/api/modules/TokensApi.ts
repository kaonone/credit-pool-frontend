import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';
import { EventEmitter } from 'web3/types';

import { memoize } from 'utils/decorators';
import { createErc20, createPToken } from 'generated/contracts';
import { Token, TokenAmount } from 'model/entities';
import { ETH_NETWORK_CONFIG } from 'env';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';

function getCurrentValueOrThrow<T>(subject: BehaviorSubject<T | null>): NonNullable<T> {
  const value = subject.getValue();

  if (value === null || value === undefined) {
    throw new Error('Subject is not contain non nullable value');
  }

  return value as NonNullable<T>;
}

export class TokensApi {
  private readonlyPtkContract: Contracts['ptk'];
  private txPtkContract = new BehaviorSubject<null | Contracts['ptk']>(null);
  private events: { forReloadPtkDistributionBalance: EventEmitter[] } | null = null;

  constructor(private web3Manager: Web3ManagerModule, private transactionsApi: TransactionsApi) {
    this.readonlyPtkContract = createPToken(
      this.web3Manager.web3,
      ETH_NETWORK_CONFIG.contracts.ptk,
    );

    this.web3Manager.txWeb3
      .pipe(map(txWeb3 => txWeb3 && createPToken(txWeb3, ETH_NETWORK_CONFIG.contracts.ptk)))
      .subscribe(this.txPtkContract);
  }

  public setEvents(events: NonNullable<TokensApi['events']>) {
    this.events = events;
  }

  @autobind
  public async approve(fromAddress: string, spender: string, amount: TokenAmount): Promise<void> {
    const txDai = this.getErc20TxContract(amount.currency.address);

    const promiEvent = txDai.methods.approve(
      { spender, amount: amount.value },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('erc20.approve', promiEvent, {
      spender,
      fromAddress,
      value: amount,
    });

    await promiEvent;
  }

  @memoize(R.identity)
  public getToken$(address: string): Observable<Token> {
    const contract = this.getErc20ReadonlyContract(address);

    return combineLatest([contract.methods.symbol(), contract.methods.decimals()]).pipe(
      map(([symbol, decimals]) => new Token(address, symbol, decimals.toNumber())),
    );
  }

  @autobind
  public toTokenAmount(tokenAddress: string, amount$: Observable<BN>): Observable<TokenAmount> {
    return combineLatest([this.getToken$(tokenAddress), amount$]).pipe(
      map(([token, amount]) => new TokenAmount(amount, token)),
    );
  }

  @memoize(R.identity)
  // TODO return TokenAmount
  public getPtkBalance$(account: string): Observable<BN> {
    return this.getBalance$(ETH_NETWORK_CONFIG.contracts.ptk, account);
  }

  // TODO remove this
  @memoize(R.identity)
  public getDaiBalance$(account: string): Observable<BN> {
    return this.getBalance$(ETH_NETWORK_CONFIG.contracts.dai, account);
  }

  @memoize((...args: string[]) => args.join())
  public getBalance$(tokenAddress: string, account: string): Observable<BN> {
    const contract = this.getErc20ReadonlyContract(tokenAddress);

    return contract.methods.balanceOf({ account }, [
      contract.events.Transfer({ filter: { from: account } }),
      contract.events.Transfer({ filter: { to: account } }),
    ]);
  }

  @memoize(R.identity)
  public getPtkDistributionBalance$(address: string): Observable<BN> {
    if (!this.events) {
      throw new Error('Events for reload not found');
    }
    return this.readonlyPtkContract.methods.distributionBalanceOf({ account: address }, [
      this.readonlyPtkContract.events.Transfer({ filter: { from: address } }),
      this.readonlyPtkContract.events.Transfer({ filter: { to: address } }),
      ...this.events.forReloadPtkDistributionBalance,
    ]);
  }

  @memoize(R.identity)
  public getTotalSupply$(address: string): Observable<BN> {
    const contract = this.getErc20ReadonlyContract(address);
    return contract.methods.totalSupply(undefined, contract.events.Transfer());
  }

  @autobind
  public async withdrawUnclaimedDistributions(fromAddress: string): Promise<void> {
    const txContracts = getCurrentValueOrThrow(this.txPtkContract);

    const promiEvent = txContracts.methods.claimDistributions(
      {
        account: fromAddress,
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('ptk.claimDistributions', promiEvent, {
      fromAddress,
    });

    await promiEvent;
  }

  @memoize(R.identity)
  public getUnclaimedDistributions$(account: string): Observable<BN> {
    return this.readonlyPtkContract.methods.calculateUnclaimedDistributions({ account }, [
      this.readonlyPtkContract.events.DistributionCreated(),
      this.readonlyPtkContract.events.DistributionsClaimed({ filter: { account } }),
    ]);
  }

  @memoize(R.identity)
  public getAccumulatedUserDistributions$(account: string): Observable<BN> {
    return combineLatest([
      this.getAccumulatedPoolDistributions$(),
      this.getDistributionTotalSupply$(),
      this.getDistributionBalanceOf$(account),
    ]).pipe(
      map(([pool, totalSupply, balance]) =>
        totalSupply.isZero() ? totalSupply : pool.mul(balance).div(totalSupply),
      ),
    );
  }

  @memoize()
  public getAccumulatedPoolDistributions$(): Observable<BN> {
    return this.readonlyPtkContract.methods.distributionAccumulator(undefined, [
      this.readonlyPtkContract.events.DistributionAccumulatorIncreased(),
      this.readonlyPtkContract.events.DistributionCreated(),
    ]);
  }

  @memoize(R.identity)
  public getDistributionBalanceOf$(account: string): Observable<BN> {
    return this.readonlyPtkContract.methods.distributionBalanceOf({ account }, [
      this.readonlyPtkContract.events.Transfer({ filter: { from: account } }),
      this.readonlyPtkContract.events.Transfer({ filter: { to: account } }),
    ]);
  }

  @memoize()
  public getDistributionTotalSupply$(): Observable<BN> {
    return this.readonlyPtkContract.methods.distributionTotalSupply(
      undefined,
      this.readonlyPtkContract.events.Transfer(),
    );
  }

  @memoize()
  public getNextDistributionTimestamp$(): Observable<number> {
    return this.readonlyPtkContract.methods
      .nextDistributionTimestamp(undefined, this.readonlyPtkContract.events.DistributionCreated())
      .pipe(map(item => item.toNumber()));
  }

  private getErc20TxContract(address: string): Contracts['erc20'] {
    const txWeb3 = getCurrentValueOrThrow(this.web3Manager.txWeb3);

    return createErc20(txWeb3, address);
  }

  private getErc20ReadonlyContract(address: string): Contracts['erc20'] {
    return createErc20(this.web3Manager.web3, address);
  }
}
