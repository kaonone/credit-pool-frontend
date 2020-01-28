import { Web3Manager } from './Web3Manager';
import { FundsModuleApi } from './FundsModuleApi';
import { LoanModuleApi } from './LoanModuleApi';
import { LiquidityModuleApi } from './LiquidityModuleApi';
import { TokensApi } from './TokensApi';
import { TransactionsApi } from './TransactionsApi';

export class Api {
  public web3Manager = new Web3Manager();
  private transactionsApi: TransactionsApi;
  private tokensApi: TokensApi;
  private fundsModuleApi: FundsModuleApi;
  private loanModuleApi: LoanModuleApi;
  private liquidityModuleApi: LiquidityModuleApi;

  constructor() {
    this.transactionsApi = new TransactionsApi();
    this.tokensApi = new TokensApi(this.web3Manager, this.transactionsApi);
    this.fundsModuleApi = new FundsModuleApi(this.web3Manager, this.tokensApi);

    this.loanModuleApi = new LoanModuleApi(
      this.web3Manager,
      this.tokensApi,
      this.transactionsApi,
      this.fundsModuleApi,
    );

    this.liquidityModuleApi = new LiquidityModuleApi(
      this.web3Manager,
      this.tokensApi,
      this.transactionsApi,
      this.fundsModuleApi,
    );
  }

  get getSubmittedTransaction$() {
    return this.transactionsApi.getSubmittedTransaction$;
  }

  get transferDai$() {
    return this.tokensApi.transferDai$;
  }

  get getTokenInfo$() {
    return this.tokensApi.getTokenInfo$;
  }

  get getAprDecimals$() {
    return this.loanModuleApi.getAprDecimals$;
  }

  get sellPtk$() {
    return this.liquidityModuleApi.sellPtk$;
  }

  get buyPtk() {
    return this.liquidityModuleApi.buyPtk;
  }

  get stakePtk() {
    return this.loanModuleApi.stakePtk;
  }

  get createLoanProposal() {
    return this.loanModuleApi.createLoanProposal;
  }

  get getBalance$() {
    return this.tokensApi.getBalance$;
  }

  get getMaxAvailableLoanSizeInDai$() {
    return this.fundsModuleApi.getMaxAvailableLoanSizeInDai$;
  }

  get getPtkBalanceInDai$() {
    return this.fundsModuleApi.getPtkBalanceInDai$;
  }

  get convertDaiToPtkEnter$() {
    return this.fundsModuleApi.convertDaiToPtkEnter$;
  }

  get convertDaiToPtkExit$() {
    return this.fundsModuleApi.convertDaiToPtkExit$;
  }

  get convertPtkToDaiExit$() {
    return this.fundsModuleApi.convertPtkToDaiExit$;
  }

  get convertPtkToDaiForLocked$() {
    return this.fundsModuleApi.convertPtkToDaiForLocked$;
  }

  get getPtkToDaiExitInfo$() {
    return this.fundsModuleApi.getPtkToDaiExitInfo$;
  }

  get getDaiToDaiExitInfo$() {
    return this.fundsModuleApi.getDaiToDaiExitInfo$;
  }

  get getMinLoanCollateralByDaiInDai$() {
    return this.tokensApi.getMinLoanCollateralByDaiInDai$;
  }

  get getDuePaymentTimeout$() {
    return this.loanModuleApi.getDuePaymentTimeout$;
  }
}
