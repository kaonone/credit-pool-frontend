import { Web3Manager } from './modules/Web3Manager';
import { FundsModuleApi } from './modules/FundsModuleApi';
import { LoanModuleApi } from './modules/LoanModuleApi';
import { LiquidityModuleApi } from './modules/LiquidityModuleApi';
import { TokensApi } from './modules/TokensApi';
import { TransactionsApi } from './modules/TransactionsApi';

export class Api {
  public web3Manager = new Web3Manager();
  public transactions: TransactionsApi;
  public tokens: TokensApi;
  public fundsModule: FundsModuleApi;
  public loanModule: LoanModuleApi;
  public liquidityModule: LiquidityModuleApi;

  constructor() {
    this.transactions = new TransactionsApi();
    this.tokens = new TokensApi(this.web3Manager, this.transactions);
    this.fundsModule = new FundsModuleApi(this.web3Manager, this.tokens);

    this.loanModule = new LoanModuleApi(
      this.web3Manager,
      this.tokens,
      this.transactions,
      this.fundsModule,
    );

    this.liquidityModule = new LiquidityModuleApi(
      this.web3Manager,
      this.tokens,
      this.transactions,
      this.fundsModule,
    );
  }
}
