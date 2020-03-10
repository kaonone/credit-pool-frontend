import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { memoize } from 'utils/decorators';
import { createErc20, createDistributionToken } from 'generated/contracts';
import { Token, ITokenInfo } from 'model/types';
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
  private readonlyContracts: Pick<Contracts, 'dai' | 'ptk'>;
  private txContracts = new BehaviorSubject<null | Pick<Contracts, 'dai' | 'ptk'>>(null);

  constructor(private web3Manager: Web3ManagerModule, private transactionsApi: TransactionsApi) {
    this.readonlyContracts = {
      dai: createErc20(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.dai),
      ptk: createDistributionToken(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.ptk),
    };

    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && {
              dai: createErc20(txWeb3, ETH_NETWORK_CONFIG.contracts.dai),
              ptk: createDistributionToken(txWeb3, ETH_NETWORK_CONFIG.contracts.ptk),
            },
        ),
      )
      .subscribe(this.txContracts);
  }

  @autobind
  public async approveDai(fromAddress: string, spender: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.txContracts).dai;

    const promiEvent = txDai.methods.approve({ spender, amount: value }, { from: fromAddress });

    this.transactionsApi.pushToSubmittedTransactions$('dai.approve', promiEvent, {
      spender,
      fromAddress,
      value,
    });

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

  @memoize((...args: string[]) => args.join())
  @autobind
  public getBalance$(token: Token, address: string): Observable<BN> {
    return this.readonlyContracts[token].methods.balanceOf(
      { account: address },
      { Transfer: [{ filter: { from: address } }, { filter: { to: address } }] },
    );
  }

  @autobind
  public async withdrawUnclaimedDistributions(fromAddress: string): Promise<void> {
    const txContracts = getCurrentValueOrThrow(this.txContracts);

    const promiEvent = txContracts.ptk.methods.claimDistributions(
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
  @autobind
  public getUnclaimedDistributions$(account: string): Observable<BN> {
    return this.readonlyContracts.ptk.methods.calculateUnlcaimedDistributions(
      { account },
      {
        DistributionCreated: {},
        DistributionsClaimed: { filter: { account } },
      },
    );
  }

  @memoize()
  @autobind
  public getAccumulatedPoolDistributions$(): Observable<BN> {
    return this.readonlyContracts.ptk.methods.distributionAccumulator(undefined, {
      DistributionAccumulatorIncreased: {},
      DistributionCreated: {},
    });
  }

  @memoize()
  @autobind
  public getNextDistributionTimestamp$(): Observable<number> {
    return this.readonlyContracts.ptk.methods
      .nextDistributionTimestmap(undefined, {
        DistributionCreated: {},
      })
      .pipe(map(item => item.toNumber()));
  }
}
