import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';
import { EventEmitter } from 'web3/types';

import { memoize } from 'utils/decorators';
import { createPToken } from 'generated/contracts';
import { ETH_NETWORK_CONFIG } from 'env';
import { getCurrentValueOrThrow } from 'utils/rxjs';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';

export class PTokenApi {
  private readonlyContract: Contracts['ptk'];
  private txContract = new BehaviorSubject<null | Contracts['ptk']>(null);
  private events: { forReloadPtkDistributionBalance: EventEmitter[] } | null = null;

  constructor(private web3Manager: Web3ManagerModule, private transactionsApi: TransactionsApi) {
    this.readonlyContract = createPToken(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.ptk);

    this.web3Manager.txWeb3
      .pipe(map(txWeb3 => txWeb3 && createPToken(txWeb3, ETH_NETWORK_CONFIG.contracts.ptk)))
      .subscribe(this.txContract);
  }

  public setEvents(events: NonNullable<PTokenApi['events']>) {
    this.events = events;
  }

  @memoize(R.identity)
  public getPtkDistributionBalance$(address: string): Observable<BN> {
    if (!this.events) {
      throw new Error('Events for reload not found');
    }
    return this.readonlyContract.methods.distributionBalanceOf({ account: address }, [
      this.readonlyContract.events.Transfer({ filter: { from: address } }),
      this.readonlyContract.events.Transfer({ filter: { to: address } }),
      ...this.events.forReloadPtkDistributionBalance,
    ]);
  }

  @autobind
  public async withdrawUnclaimedDistributions(fromAddress: string): Promise<void> {
    const txContracts = getCurrentValueOrThrow(this.txContract);

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
    return this.readonlyContract.methods.calculateUnclaimedDistributions({ account }, [
      this.readonlyContract.events.DistributionCreated(),
      this.readonlyContract.events.DistributionsClaimed({ filter: { account } }),
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
    return this.readonlyContract.methods.distributionAccumulator(undefined, [
      this.readonlyContract.events.DistributionAccumulatorIncreased(),
      this.readonlyContract.events.DistributionCreated(),
    ]);
  }

  @memoize(R.identity)
  public getDistributionBalanceOf$(account: string): Observable<BN> {
    return this.readonlyContract.methods.distributionBalanceOf({ account }, [
      this.readonlyContract.events.Transfer({ filter: { from: account } }),
      this.readonlyContract.events.Transfer({ filter: { to: account } }),
    ]);
  }

  @memoize()
  public getDistributionTotalSupply$(): Observable<BN> {
    return this.readonlyContract.methods.distributionTotalSupply(
      undefined,
      this.readonlyContract.events.Transfer(),
    );
  }

  @memoize()
  public getNextDistributionTimestamp$(): Observable<number> {
    return this.readonlyContract.methods
      .nextDistributionTimestamp(undefined, this.readonlyContract.events.DistributionCreated())
      .pipe(map(item => item.toNumber()));
  }
}
