import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { memoize } from 'utils/decorators';
import { createErc20 } from 'generated/contracts';
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
      ptk: createErc20(this.web3Manager.web3, ETH_NETWORK_CONFIG.contracts.ptk),
    };

    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && {
              dai: createErc20(txWeb3, ETH_NETWORK_CONFIG.contracts.dai),
              ptk: createErc20(txWeb3, ETH_NETWORK_CONFIG.contracts.ptk),
            },
        ),
      )
      .subscribe(this.txContracts);
  }

  @autobind
  public async approveDai(fromAddress: string, spender: string, value: BN): Promise<void> {
    const txDai = getCurrentValueOrThrow(this.txContracts).dai;

    const promiEvent = txDai.methods.approve(
      { _spender: spender, _value: value },
      { from: fromAddress },
    );

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
      { _owner: address },
      { Transfer: [{ filter: { _from: address } }, { filter: { _to: address } }] },
    );
  }
}
