import { Observable, BehaviorSubject, of } from 'rxjs';
import { first as firstOperator, map } from 'rxjs/operators';
import BN from 'bn.js';
import { autobind } from 'core-decorators';

import { min } from 'utils/bn';
import { ETH_NETWORK_CONFIG } from 'env';
import { createLiquidityModule } from 'generated/contracts';
import { memoize } from 'utils/decorators';
import { calcWithdrawAmountBeforeFee } from 'model';
import { TokenAmount } from 'model/entities';
import { getCurrentValueOrThrow } from 'utils/rxjs';

import { Contracts, Web3ManagerModule } from '../types';
import { Erc20Api } from './Erc20Api';
import { TransactionsApi } from './TransactionsApi';
import { FundsModuleApi } from './FundsModuleApi';
import { CurveModuleApi } from './CurveModuleApi';

function first<T>(input: Observable<T>): Promise<T> {
  return input.pipe(firstOperator()).toPromise();
}

export class LiquidityModuleApi {
  private readonlyContract: Contracts['liquidityModule'];
  private txContract = new BehaviorSubject<null | Contracts['liquidityModule']>(null);

  constructor(
    private web3Manager: Web3ManagerModule,
    private erc20Api: Erc20Api,
    private transactionsApi: TransactionsApi,
    private fundsModuleApi: FundsModuleApi,
    private curveModuleApi: CurveModuleApi,
  ) {
    this.readonlyContract = createLiquidityModule(
      web3Manager.web3,
      ETH_NETWORK_CONFIG.contracts.liquidityModule,
    );

    this.web3Manager.txWeb3
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && createLiquidityModule(txWeb3, ETH_NETWORK_CONFIG.contracts.liquidityModule),
        ),
      )
      .subscribe(this.txContract);
  }

  @memoize()
  public getConfig$(): Observable<{ lDepositMin: BN; pWithdrawMin: BN }> {
    return this.readonlyContract.methods.limits().pipe(
      map(([lDepositMin, pWithdrawMin]) => ({
        lDepositMin,
        pWithdrawMin,
      })),
    );
  }

  @autobind
  public async sellPtk(fromAddress: string, amountAfterFee: TokenAmount): Promise<void> {
    const txLiquidityModule = getCurrentValueOrThrow(this.txContract);

    const { percentDivider, withdrawFeePercent } = await first(this.curveModuleApi.getConfig$());
    const lAmountBeforeFee = await first(
      this.fundsModuleApi.toLiquidityAmount$(
        of(
          calcWithdrawAmountBeforeFee({
            withdrawAmountAfterFee: amountAfterFee,
            percentDivider,
            withdrawFeePercent,
          }),
        ),
      ),
    );

    const pAmountWithFee = await first(
      this.fundsModuleApi.convertLiquidityToPtkExit$(lAmountBeforeFee),
    );
    const pBalance = await first(this.erc20Api.getPtkBalance$(fromAddress));

    const promiEvent = txLiquidityModule.methods.withdraw(
      { lAmountMin: new BN(0), pAmount: min(pAmountWithFee.toBN(), pBalance) },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('liquidity.sellPtk', promiEvent, {
      address: fromAddress,
      sourceAmount: amountAfterFee,
    });

    await promiEvent;
  }

  @autobind
  public async buyPtk(fromAddress: string, amount: TokenAmount): Promise<void> {
    const txLiquidityModule = getCurrentValueOrThrow(this.txContract);

    await this.erc20Api.approve(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule, amount);

    const promiEvent = txLiquidityModule.methods.deposit(
      { lAmount: amount.toBN(), pAmountMin: new BN(0) },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('liquidity.buyPtk', promiEvent, {
      address: fromAddress,
      sourceAmount: amount,
    });

    await promiEvent;
  }
}
