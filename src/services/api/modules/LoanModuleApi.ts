import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, first as firstOperator, switchMap } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { min } from 'utils/bn';
import { memoize } from 'utils/decorators';
import { createLoanModule } from 'generated/contracts';
import { ETH_NETWORK_CONFIG, MIN_COLLATERAL_PERCENT_FOR_BORROWER } from 'env';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';
import { TokensApi } from './TokensApi';
import { FundsModuleApi } from './FundsModuleApi';

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

export class LoanModuleApi {
  private readonlyContract: Contracts['loanModule'];
  private txContract = new BehaviorSubject<null | Contracts['loanModule']>(null);

  constructor(
    private web3Manager: Web3ManagerModule,
    private tokensApi: TokensApi,
    private transactionsApi: TransactionsApi,
    private fundsModuleApi: FundsModuleApi,
  ) {
    this.readonlyContract = createLoanModule(
      this.web3Manager.web3,
      ETH_NETWORK_CONFIG.contracts.loanModule,
    );

    this.web3Manager.txWeb3
      .pipe(
        map(txWeb3 => txWeb3 && createLoanModule(txWeb3, ETH_NETWORK_CONFIG.contracts.loanModule)),
      )
      .subscribe(this.txContract);
  }

  @memoize()
  @autobind
  public getConfig$(): Observable<{
    lDebtAmountMin: BN;
    debtInterestMin: BN;
    pledgePercentMin: BN;
    lMinPledgeMax: BN;
  }> {
    return this.readonlyContract.methods.limits().pipe(
      map(([lDebtAmountMin, debtInterestMin, pledgePercentMin, lMinPledgeMax]) => ({
        lDebtAmountMin,
        debtInterestMin,
        pledgePercentMin,
        lMinPledgeMax,
      })),
    );
  }

  @memoize()
  @autobind
  public getAprDecimals$(): Observable<number> {
    // on the contract, apr is measured in fractions of a unit, so we need to shift the decimals by 2
    const toPercentMultiplierDivider = 2;

    return this.readonlyContract.methods.INTEREST_MULTIPLIER().pipe(
      map(multiplier => {
        // the multiplier is 10^n
        const decimals = multiplier.toString().length - 1 - toPercentMultiplierDivider;
        return Math.max(0, decimals);
      }),
    );
  }

  @autobind
  public async stakePtk(
    fromAddress: string,
    values: { sourceAmount: BN; borrower: string; proposalId: string },
  ): Promise<void> {
    const { sourceAmount, borrower, proposalId } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    const pAmount = await first(this.fundsModuleApi.convertDaiToPtkExit$(sourceAmount.toString()));
    const pBalance = await first(this.tokensApi.getBalance$('ptk', fromAddress));

    await this.tokensApi.approveAllPtk(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule);

    const promiEvent = txLoanModule.methods.addPledge(
      {
        borrower,
        lAmountMin: new BN(0),
        pAmount: min(pAmount, pBalance),
        proposal: new BN(proposalId),
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.addPledge', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async createLoanProposal(
    fromAddress: string,
    values: { sourceAmount: BN; apr: string; description: string },
  ): Promise<void> {
    const { sourceAmount, apr } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    const minLCollateral = await first(
      this.getMinLoanCollateralByDaiInDai$(sourceAmount.toString()),
    );
    const pAmount = await first(
      this.fundsModuleApi.convertDaiToPtkExit$(minLCollateral.toString()),
    );
    const pBalance = await first(this.tokensApi.getBalance$('ptk', fromAddress));

    await this.tokensApi.approveAllPtk(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule);

    const promiEvent = txLoanModule.methods.createDebtProposal(
      {
        pAmountMax: min(pAmount, pBalance),
        debtLAmount: sourceAmount,
        interest: new BN(apr),
        descriptionHash: '0xb2fde6c9b9d74af2e49cc0e9ebc64112b523165066785d6f286b3d6c08660529',
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.createProposal', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @memoize(R.identity)
  @autobind
  public getDuePaymentTimeout$(): Observable<BN> {
    return this.readonlyContract.methods.DEBT_REPAY_DEADLINE_PERIOD();
  }

  @memoize(R.identity)
  @autobind
  public getMaxAvailableLoanSizeInDai$(address: string): Observable<BN> {
    return this.tokensApi.getBalance$('ptk', address).pipe(
      switchMap(balance => {
        return this.fundsModuleApi.convertPtkToDaiExit$(balance.toString());
      }),
      map(item => item.muln(100).divn(MIN_COLLATERAL_PERCENT_FOR_BORROWER)),
    );
  }

  @memoize(R.identity)
  public getPledgeRequirements$(
    borrower: string,
    proposalId: string,
  ): Observable<{ minLPledge: BN; maxLPledge: BN }> {
    return this.readonlyContract.methods
      .getPledgeRequirements({
        borrower,
        proposal: new BN(proposalId),
      })
      .pipe(map(([minLPledge, maxLPledge]) => ({ minLPledge, maxLPledge })));
  }

  @memoize(R.identity)
  // eslint-disable-next-line class-methods-use-this
  public getMinLoanCollateralByDaiInDai$(ptkBalanceInDai: string): Observable<BN> {
    return of(new BN(ptkBalanceInDai).muln(MIN_COLLATERAL_PERCENT_FOR_BORROWER).divn(100));
  }
}
