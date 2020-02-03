import { Observable, BehaviorSubject } from 'rxjs';
import { first as firstOperator, map } from 'rxjs/operators';
import BN from 'bn.js';
import { autobind } from 'core-decorators';

import { min } from 'utils/bn';
import { ETH_NETWORK_CONFIG } from 'env';
import { createLiquidityModule } from 'generated/contracts';

import { Contracts, Web3ManagerModule } from '../types';
import { TokensApi } from './TokensApi';
import { TransactionsApi } from './TransactionsApi';
import { FundsModuleApi } from './FundsModuleApi';
import { CurveModuleApi } from './CurveModuleApi';

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

export class LiquidityModuleApi {
  private txContract = new BehaviorSubject<null | Contracts['liquidityModule']>(null);

  constructor(
    private web3Manager: Web3ManagerModule,
    private tokensApi: TokensApi,
    private transactionsApi: TransactionsApi,
    private fundsModuleApi: FundsModuleApi,
    private curveModuleApi: CurveModuleApi,
  ) {
    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && createLiquidityModule(txWeb3, ETH_NETWORK_CONFIG.contracts.liquidityModule),
        ),
      )
      .subscribe(this.txContract);
  }

  @autobind
  public async sellPtk(fromAddress: string, values: { sourceAmount: BN }): Promise<void> {
    const { sourceAmount: lAmountWithoutFee } = values;
    const txLiquidityModule = getCurrentValueOrThrow(this.txContract);

    const { percentDivider, withdrawFeePercent } = await first(this.curveModuleApi.getConfig$());
    const lAmountWithFee = lAmountWithoutFee.mul(percentDivider).div(withdrawFeePercent);

    const pAmountWithFee = await first(
      this.fundsModuleApi.convertDaiToPtkExit$(lAmountWithFee.toString()),
    );
    const pBalance = await first(this.tokensApi.getBalance$('ptk', fromAddress));

    await this.tokensApi.approveAllPtk(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule);

    const promiEvent = txLiquidityModule.methods.withdraw(
      { lAmountMin: new BN(0), pAmount: min(pAmountWithFee, pBalance) },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('liquidity.sellPtk', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async buyPtk(fromAddress: string, values: { sourceAmount: BN }): Promise<void> {
    const { sourceAmount } = values;
    const txLiquidityModule = getCurrentValueOrThrow(this.txContract);

    await this.tokensApi.approveDai(
      fromAddress,
      ETH_NETWORK_CONFIG.contracts.fundsModule,
      sourceAmount,
    );

    const promiEvent = txLiquidityModule.methods.deposit(
      { lAmount: sourceAmount, pAmountMin: new BN(0) },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('liquidity.buyPtk', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }
}
