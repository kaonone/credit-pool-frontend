import { Web3Manager } from './modules/Web3Manager';
import { FundsModuleApi } from './modules/FundsModuleApi';
import { LoanModuleApi } from './modules/LoanModuleApi';
import { LiquidityModuleApi } from './modules/LiquidityModuleApi';
import { TokensApi } from './modules/TokensApi';
import { TransactionsApi } from './modules/TransactionsApi';
import { SwarmApi } from './modules/SwarmApi';
import { CurveModuleApi } from './modules/CurveModuleApi';

export class Api {
  public web3Manager = new Web3Manager();
  public swarmApi = new SwarmApi();

  public transactions = new TransactionsApi();
  public tokens = new TokensApi(this.web3Manager, this.transactions);
  public curveModule = new CurveModuleApi(this.web3Manager);

  public fundsModule = new FundsModuleApi(this.web3Manager, this.tokens);
  public loanModule = new LoanModuleApi(
    this.web3Manager,
    this.tokens,
    this.transactions,
    this.fundsModule,
    this.swarmApi,
  );

  public liquidityModule = new LiquidityModuleApi(
    this.web3Manager,
    this.tokens,
    this.transactions,
    this.fundsModule,
    this.curveModule,
  );
}
