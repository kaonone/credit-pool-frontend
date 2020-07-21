import ApolloClient from 'apollo-client';

import { Web3Manager } from './modules/Web3Manager';
import { FundsModuleApi } from './modules/FundsModuleApi';
import { LoanModuleApi } from './modules/LoanModuleApi';
import { LiquidityModuleApi } from './modules/LiquidityModuleApi';
import { Erc20Api } from './modules/Erc20Api';
import { TransactionsApi } from './modules/TransactionsApi';
import { SwarmApi } from './modules/SwarmApi';
import { CurveModuleApi } from './modules/CurveModuleApi';
import { DefiModuleApi } from './modules/DefiModuleApi';
import { makeSubgraphApi } from './modules/SubgraphApi';
import { PTokenApi } from './modules/PTokenApi';

export class Api {
  public web3Manager = new Web3Manager();
  public swarmApi = new SwarmApi();
  public subgraphApi = makeSubgraphApi(this.apolloClient);

  public transactions = new TransactionsApi();
  public erc20 = new Erc20Api(this.web3Manager, this.transactions);
  public pToken = new PTokenApi(this.web3Manager, this.transactions, this.erc20);

  public curveModule = new CurveModuleApi(this.web3Manager);
  public fundsModule = new FundsModuleApi(this.web3Manager, this.curveModule, this.erc20);
  public defiModule = new DefiModuleApi(
    this.web3Manager,
    this.transactions,
    this.erc20,
    this.subgraphApi,
  );

  public loanModule = new LoanModuleApi(
    this.web3Manager,
    this.erc20,
    this.transactions,
    this.fundsModule,
    this.swarmApi,
    this.curveModule,
  );

  public liquidityModule = new LiquidityModuleApi(
    this.web3Manager,
    this.erc20,
    this.transactions,
    this.fundsModule,
    this.curveModule,
  );

  constructor(private apolloClient: ApolloClient<any>) {
    this.fundsModule.setTotalLProposalGetter(
      this.loanModule.getTotalLProposals$.bind(this.loanModule), // TODO add autobind to memoize decorator
    );
    this.fundsModule.setUnpaidInterestGetter(
      this.loanModule.getUnpaidInterest$.bind(this.loanModule),
    );
    this.pToken.setEvents({
      forReloadPtkDistributionBalance: [
        this.loanModule.readonlyContracts.proposals.events.DebtProposalExecuted(),
      ],
    });
  }
}
