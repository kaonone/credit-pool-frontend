import { Observable } from 'rxjs';
import BN from 'bn.js';
import ApolloClient from 'apollo-client';
import { map } from 'rxjs/operators';
import { autobind } from 'core-decorators';

import { Currency, PercentAmount } from 'model/entities';
import { memoize } from 'utils/decorators';
import { decimalsToWei } from 'utils/bn';
import { LoanToLiquidate } from 'model/loans';

import { makeSubgraphApi } from './makeSubgraphApi';
import { mkLoansForLiquidationConverter } from './converters';

export class SubgraphApi {
  private sdk = makeSubgraphApi(this.apolloClient);

  constructor(private apolloClient: ApolloClient<any>) {}

  @autobind
  public getAvgPoolAPY$(fromDate: BN) {
    return this.sdk.DefiAprsFromDate({ fromDate: fromDate.toString() }).pipe(
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

  @memoize((currency: Currency, ...rest: string[]) => currency.toString() + rest.join())
  public loadLoansForLiquidation$(
    currency: Currency,
    debtRepayDeadlinePeriod: BN,
    lastUpdateLt: string,
    lastUpdateGt: string,
  ): Observable<LoanToLiquidate[]> {
    return this.sdk
      .DebtsAvailableForLiquidation({ lastUpdateLt, lastUpdateGt })
      .pipe(
        map(data =>
          data.debts.map(mkLoansForLiquidationConverter(currency, debtRepayDeadlinePeriod)),
        ),
      );
  }
}
