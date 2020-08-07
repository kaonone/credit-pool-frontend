import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { memoize } from 'utils/decorators';
import { createErc20 } from 'generated/contracts';
import { Token, TokenAmount } from 'model/entities';
import { ETH_NETWORK_CONFIG } from 'env';
import { getCurrentValueOrThrow, awaitFirst } from 'utils/rxjs';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';

const INFINITE_APPROVE_MIN = new BN(2).pow(new BN(254));
const INFINITE_APPROVE_MAX = new BN(2).pow(new BN(256)).subn(1);

export class Erc20Api {
  constructor(private web3Manager: Web3ManagerModule, private transactionsApi: TransactionsApi) {}

  @autobind
  public async approveMultiple(
    fromAddress: string,
    spender: string,
    amounts: TokenAmount[],
  ): Promise<void> {
    await Promise.all(amounts.map(amount => this.approve(fromAddress, spender, amount)));
  }

  @autobind
  public async approve(fromAddress: string, spender: string, amount: TokenAmount): Promise<void> {
    const allowance = await awaitFirst(
      this.getAllowance$(amount.currency.address, fromAddress, spender),
    );

    if (allowance.gte(amount.toBN())) {
      return;
    }

    await this.approveBase(fromAddress, spender, amount);
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
    return this.getBalance$(ETH_NETWORK_CONFIG.tokens.dai, account);
  }

  @memoize((...args: string[]) => args.join())
  public getBalance$(tokenAddress: string, account: string): Observable<BN> {
    const contract = this.getErc20ReadonlyContract(tokenAddress);

    return contract.methods.balanceOf({ account }, [
      contract.events.Transfer({ filter: { from: account } }),
      contract.events.Transfer({ filter: { to: account } }),
    ]);
  }

  @memoize((...args: string[]) => args.join())
  public getAllowance$(tokenAddress: string, owner: string, spender: string): Observable<BN> {
    const contract = this.getErc20ReadonlyContract(tokenAddress);

    return contract.methods.allowance({ owner, spender }, [
      contract.events.Transfer({ filter: { from: owner } }),
      contract.events.Approval({ filter: { owner, spender } }),
    ]);
  }

  @memoize(R.identity)
  public getTotalSupply$(address: string): Observable<BN> {
    const contract = this.getErc20ReadonlyContract(address);
    return contract.methods.totalSupply(undefined, contract.events.Transfer());
  }

  @memoize((...args: string[]) => args.join())
  public hasInfiniteApprove(
    tokenAddress: string,
    owner: string,
    spender: string,
  ): Observable<boolean> {
    return this.getAllowance$(tokenAddress, owner, spender).pipe(
      map(allowance => allowance.gt(INFINITE_APPROVE_MIN)),
    );
  }

  @autobind
  public async infiniteApproveMultiple(fromAddress: string, spender: string, tokens: Token[]) {
    return this.approveMultiple(
      fromAddress,
      spender,
      tokens.map(token => new TokenAmount(INFINITE_APPROVE_MAX, token)),
    );
  }

  @autobind
  public revertInfiniteApproveMultiple(fromAddress: string, spender: string, tokens: Token[]) {
    return this.approveBaseMultiple(
      fromAddress,
      spender,
      tokens.map(token => new TokenAmount(0, token)),
    );
  }

  @autobind
  private async approveBaseMultiple(
    fromAddress: string,
    spender: string,
    amounts: TokenAmount[],
  ): Promise<void> {
    await Promise.all(amounts.map(amount => this.approveBase(fromAddress, spender, amount)));
  }

  @autobind
  private async approveBase(
    fromAddress: string,
    spender: string,
    amount: TokenAmount,
  ): Promise<void> {
    const txContract = this.getErc20TxContract(amount.currency.address);

    const promiEvent = txContract.methods.approve(
      { spender, amount: amount.toBN() },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$(
      (amount.isZero() && 'erc20.revertApprove') ||
        (amount.gt(INFINITE_APPROVE_MIN) && 'erc20.infiniteApprove') ||
        'erc20.approve',
      promiEvent,
      {
        spender,
        fromAddress,
        value: amount,
      },
    );

    await promiEvent;
  }

  private getErc20TxContract(address: string): Contracts['erc20'] {
    const txWeb3 = getCurrentValueOrThrow(this.web3Manager.txWeb3);

    return createErc20(txWeb3, address);
  }

  private getErc20ReadonlyContract(address: string): Contracts['erc20'] {
    return createErc20(this.web3Manager.web3, address);
  }
}
