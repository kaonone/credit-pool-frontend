import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { autobind } from 'core-decorators';
import * as R from 'ramda';
import BN from 'bn.js';

import { ETH_NETWORK_CONFIG } from 'env';
import { createDeFiModule } from 'generated/contracts';
import { memoize } from 'utils/decorators';
import { TokenAmount, PercentAmount } from 'model/entities';
import { getCurrentValueOrThrow } from 'utils/rxjs';
import { decimalsToWei } from 'utils/bn';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';
import { Erc20Api } from './Erc20Api';
import { SubgraphApi } from './SubgraphApi.model';

export class DefiModuleApi {
  private readonlyContract: Contracts['defiModule'];
  private txContract = new BehaviorSubject<null | Contracts['defiModule']>(null);

  constructor(
    private web3Manager: Web3ManagerModule,
    private transactionsApi: TransactionsApi,
    private erc20Api: Erc20Api,
    private subgraphApi: SubgraphApi,
  ) {
    this.readonlyContract = createDeFiModule(
      web3Manager.web3,
      ETH_NETWORK_CONFIG.contracts.defiModule,
    );

    this.web3Manager.txWeb3
      .pipe(
        map(txWeb3 => txWeb3 && createDeFiModule(txWeb3, ETH_NETWORK_CONFIG.contracts.defiModule)),
      )
      .subscribe(this.txContract);
  }

  @memoize()
  public getAvgPoolAPY$(): Observable<PercentAmount> {
    const reloadDelay = 60 * 60 * 1000;

    return timer(0, reloadDelay).pipe(
      map(() => new BN(Date.now()).divn(1000).subn(24 * 60 * 60)),
      switchMap(fromDate => this.subgraphApi.DefiAprsFromDate({ fromDate: fromDate.toString() })),
      map(data => {
        if (!data.defiAPRs) {
          return new PercentAmount(0);
        }

        const { numerator, denominator } = data.defiAPRs.reduce(
          (acc, cur) => {
            const apr = new PercentAmount(cur.apr).div(decimalsToWei(cur.aprDecimals));
            return {
              numerator: acc.numerator.add(apr.mul(cur.duration)),
              denominator: acc.denominator.add(new BN(cur.duration)),
            };
          },
          {
            numerator: new PercentAmount(0),
            denominator: new BN(0),
          },
        );

        return numerator.div(denominator);
      }),
    );
  }

  @memoize(R.identity)
  public getAvailableInterest$(account: string): Observable<TokenAmount> {
    return this.erc20Api.toTokenAmount(
      ETH_NETWORK_CONFIG.contracts.dai,
      this.readonlyContract.methods.availableInterest({ account }, [
        this.readonlyContract.events.InvestmentDistributionCreated(),
        this.readonlyContract.events.WithdrawInterest({ filter: { account } }),
      ]),
    );
  }

  @autobind
  public async withdrawInterest(fromAddress: string): Promise<void> {
    const txModule = getCurrentValueOrThrow(this.txContract);

    const promiEvent = txModule.methods.withdrawInterest(undefined, { from: fromAddress });

    this.transactionsApi.pushToSubmittedTransactions$('defi.withdrawInterest', promiEvent, {
      address: fromAddress,
    });

    await promiEvent;
  }
}
