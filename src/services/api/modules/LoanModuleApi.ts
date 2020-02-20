import { Observable, BehaviorSubject, of, combineLatest, timer } from 'rxjs';
import { map, first as firstOperator, switchMap } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { min, bnToBn, max, decimalsToWei } from 'utils/bn';
import { memoize } from 'utils/decorators';
import { createLoanModule } from 'generated/contracts';
import {
  ETH_NETWORK_CONFIG,
  MIN_COLLATERAL_PERCENT_FOR_BORROWER,
  PLEDGE_MARGIN_DIVIDER,
} from 'env';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';
import { TokensApi } from './TokensApi';
import { FundsModuleApi } from './FundsModuleApi';
import { SwarmApi } from './SwarmApi';

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
    private swarmApi: SwarmApi,
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
    limits: {
      lDebtAmountMin: BN;
      debtInterestMin: BN;
      pledgePercentMin: BN;
      lMinPledgeMax: BN;
    };
    debtRepayDeadlinePeriod: BN;
    collateralToDebtRatio: BN;
    collateralToDebtRatioMultiplier: BN;
  }> {
    return combineLatest([
      this.readonlyContract.methods.limits(),
      this.readonlyContract.methods.DEBT_REPAY_DEADLINE_PERIOD(),
      this.readonlyContract.methods.COLLATERAL_TO_DEBT_RATIO(),
      this.readonlyContract.methods.COLLATERAL_TO_DEBT_RATIO_MULTIPLIER(),
    ]).pipe(
      map(
        ([
          [lDebtAmountMin, debtInterestMin, pledgePercentMin, lMinPledgeMax],
          debtRepayDeadlinePeriod,
          collateralToDebtRatio,
          collateralToDebtRatioMultiplier,
        ]) => ({
          limits: {
            lDebtAmountMin,
            debtInterestMin,
            pledgePercentMin,
            lMinPledgeMax,
          },
          debtRepayDeadlinePeriod,
          collateralToDebtRatio,
          collateralToDebtRatioMultiplier,
        }),
      ),
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

  @memoize()
  @autobind
  public getTotalLProposals$(): Observable<BN> {
    return this.readonlyContract.methods.totalLProposals(undefined, {
      PledgeAdded: {},
      PledgeWithdrawn: {},
      DebtProposalExecuted: {},
    });
  }

  @autobind
  public async stakePtk(
    fromAddress: string,
    values: { sourceAmount: BN; borrower: string; proposalId: string },
  ): Promise<void> {
    const { sourceAmount, borrower, proposalId } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    const daiInfo = await first(this.tokensApi.getTokenInfo$('dai'));

    const pledgeMargin = decimalsToWei(daiInfo.decimals).divn(PLEDGE_MARGIN_DIVIDER);

    const pAmount = await first(
      this.fundsModuleApi.convertDaiToPtkExit$(sourceAmount.add(pledgeMargin).toString()),
    );
    const pBalance = await first(this.tokensApi.getBalance$('ptk', fromAddress));

    const promiEvent = txLoanModule.methods.addPledge(
      {
        borrower,
        lAmountMin: new BN(0),
        pAmount: min(pAmount, pBalance),
        proposal: bnToBn(proposalId),
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
  public async unstakePtk(
    fromAddress: string,
    values: {
      sourceAmount: BN; // in DAI by currentFullStakeCost
      borrower: string;
      proposalId: string;
      lInitialLocked: string;
      pInitialLocked: string;
    },
  ): Promise<void> {
    const { sourceAmount, borrower, proposalId, pInitialLocked, lInitialLocked } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    const currentFullStakeCost = await first(
      this.fundsModuleApi.getAvailableBalanceIncreasing$(
        fromAddress,
        pInitialLocked,
        lInitialLocked,
      ),
    );

    const pAmount = new BN(pInitialLocked).mul(sourceAmount).div(new BN(currentFullStakeCost));

    const promiEvent = txLoanModule.methods.withdrawPledge(
      {
        borrower,
        pAmount,
        proposal: bnToBn(proposalId),
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.unstakePledge', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async unlockPtkFromPledge(
    fromAddress: string,
    values: {
      borrower: string;
      debtId: string;
    },
  ): Promise<void> {
    const { borrower, debtId } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    const promiEvent = txLoanModule.methods.withdrawUnlockedPledge(
      {
        borrower,
        debt: bnToBn(debtId),
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.withdrawUnlockedPledge', promiEvent, {
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
    const { sourceAmount, apr, description } = values;
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    const hash = await this.swarmApi.upload<string>(description);

    const minLCollateral = await first(
      this.getMinLoanCollateralByDaiInDai$(sourceAmount.toString()),
    );
    const pAmount = await first(
      this.fundsModuleApi.convertDaiToPtkExit$(minLCollateral.toString()),
    );
    const pBalance = await first(this.tokensApi.getBalance$('ptk', fromAddress));

    const promiEvent = txLoanModule.methods.createDebtProposal(
      {
        pAmountMax: min(pAmount, pBalance),
        debtLAmount: sourceAmount,
        interest: new BN(apr),
        descriptionHash: hash,
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.createProposal', promiEvent, {
      address: fromAddress,
      ...values,
    });

    await promiEvent;
  }

  @autobind
  public async executeDebtProposal(fromAddress: string, proposalId: string): Promise<void> {
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    const promiEvent = txLoanModule.methods.executeDebtProposal(
      { proposal: bnToBn(proposalId) },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.executeProposal', promiEvent, {
      address: fromAddress,
      proposalId,
    });

    await promiEvent;
  }

  @autobind
  public async liquidateDebt(fromAddress: string, borrower: string, debtId: string): Promise<void> {
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    const promiEvent = txLoanModule.methods.executeDebtDefault(
      {
        borrower,
        debt: bnToBn(debtId),
      },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.liquidateDebt', promiEvent, {
      address: fromAddress,
      borrower,
      debtId,
    });

    await promiEvent;
  }

  @autobind
  public async repay(fromAddress: string, debtId: string, lAmount: BN): Promise<void> {
    const txLoanModule = getCurrentValueOrThrow(this.txContract);

    await this.tokensApi.approveDai(fromAddress, ETH_NETWORK_CONFIG.contracts.fundsModule, lAmount);

    const promiEvent = txLoanModule.methods.repay(
      { debt: bnToBn(debtId), lAmount },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions$('loan.repay', promiEvent, {
      address: fromAddress,
      debtId,
      amount: lAmount,
    });

    await promiEvent;
  }

  @memoize(R.identity)
  @autobind
  public getMaxAvailableLoanSizeInDai$(address: string): Observable<BN> {
    return this.tokensApi.getBalance$('ptk', address).pipe(
      switchMap(balance => {
        return this.fundsModuleApi.getPtkToDaiExitInfo$(balance.toString());
      }),
      map(item => item.total.muln(100).divn(MIN_COLLATERAL_PERCENT_FOR_BORROWER)),
    );
  }

  @memoize((...args: string[]) => args.join())
  @autobind
  public getDebtRequiredPayments$(
    borrower: string,
    debtId: string,
    lastPayment: string,
  ): Observable<{ loanSize: BN; currentInterest: BN }> {
    const marginOfSeconds = 30 * 60;
    const recalcInterestIntervalInMs = 10 * 60 * 1000;

    return timer(0, recalcInterestIntervalInMs).pipe(
      switchMap(() =>
        this.readonlyContract.methods.getDebtRequiredPayments(
          {
            borrower,
            debt: bnToBn(debtId),
          },
          {
            Repay: { filter: { sender: borrower } },
            DebtDefaultExecuted: { filter: { borrower } },
          },
        ),
      ),
      map(([loanSize, currentInterest]) => {
        const secondsAfterPayment = new BN(Date.now() / 1000 - parseInt(lastPayment, 10));

        return {
          loanSize,
          currentInterest: currentInterest
            .mul(secondsAfterPayment.addn(marginOfSeconds))
            .div(secondsAfterPayment),
        };
      }),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getPledgeRequirements$(
    borrower: string,
    proposalId: string,
  ): Observable<{ minLPledge: BN; maxLPledge: BN; minPPledge: BN; maxPPledge: BN }> {
    return this.readonlyContract.methods
      .getPledgeRequirements(
        {
          borrower,
          proposal: bnToBn(proposalId),
        },
        {
          PledgeAdded: {},
          PledgeWithdrawn: {},
        },
        1000,
      )
      .pipe(
        switchMap(([minLPledge, maxLPledge]) => {
          return combineLatest([
            of([minLPledge, maxLPledge]),
            this.fundsModuleApi.convertDaiToPtkExit$(minLPledge.toString()),
            this.fundsModuleApi.convertDaiToPtkExit$(maxLPledge.toString()),
          ]);
        }),
        map(([[minLPledge, maxLPledge], minPPledge, maxPPledge]) => ({
          minLPledge,
          maxLPledge,
          minPPledge,
          maxPPledge,
        })),
      );
  }

  @memoize(R.identity)
  // eslint-disable-next-line class-methods-use-this
  public getMinLoanCollateralByDaiInDai$(ptkBalanceInDai: string): Observable<BN> {
    return of(new BN(ptkBalanceInDai).muln(MIN_COLLATERAL_PERCENT_FOR_BORROWER).divn(100));
  }

  @memoize(R.identity)
  // eslint-disable-next-line class-methods-use-this
  public calculateFullLoanStake$(loanSize: string): Observable<BN> {
    return this.getConfig$().pipe(
      map(({ collateralToDebtRatio, collateralToDebtRatioMultiplier }) =>
        new BN(loanSize)
          .mul(new BN(collateralToDebtRatio))
          .div(new BN(collateralToDebtRatioMultiplier)),
      ),
    );
  }

  @memoize((...args: string[]) => args.join())
  // eslint-disable-next-line class-methods-use-this
  public calculatePAvailableForUnlock$(
    borrower: string,
    supporter: string,
    debtId: string,
  ): Observable<BN> {
    return this.calculatePledgeInfo$(borrower, supporter, debtId).pipe(
      map(({ pUnlocked, pInterest, pWithdrawn }) =>
        max('0', pUnlocked.add(pInterest).sub(pWithdrawn)),
      ),
    );
  }

  @memoize((...args: string[]) => args.join())
  // eslint-disable-next-line class-methods-use-this
  private calculatePledgeInfo$(
    borrower: string,
    supporter: string,
    debtId: string,
  ): Observable<{
    pLocked: BN;
    pUnlocked: BN;
    pInterest: BN;
    pWithdrawn: BN;
  }> {
    return this.readonlyContract.methods
      .calculatePledgeInfo(
        {
          borrower,
          debt: bnToBn(debtId),
          supporter,
        },
        {
          Repay: { filter: { sender: borrower } },
          DebtDefaultExecuted: { filter: { borrower } },
          UnlockedPledgeWithdraw: { filter: { sender: supporter } },
        },
      )
      .pipe(
        map(([pLocked, pUnlocked, pInterest, pWithdrawn]) => ({
          pLocked,
          pUnlocked,
          pInterest,
          pWithdrawn,
        })),
      );
  }
}
