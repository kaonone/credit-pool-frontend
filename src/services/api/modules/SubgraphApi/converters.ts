import BN from 'bn.js';
import moment from 'moment';

import * as SR from 'generated/gql/subgraphRequests';
import { Currency, LiquidityAmount } from 'model/entities';
import { LoanToLiquidate } from 'model/loans';
import { getLoanDuePaymentDate } from 'model';

export function mkLoansForLiquidationConverter(currency: Currency, debtRepayDeadlinePeriod: BN) {
  return (x: SR.DebtsAvailableForLiquidationSubscription['debts'][0]): LoanToLiquidate => {
    const repaymentDue = moment(
      getLoanDuePaymentDate(x.last_update, debtRepayDeadlinePeriod) as Date,
    );
    return {
      borrower: x.borrower.id,
      debtID: x.debt_id as string,
      loanGranted: new LiquidityAmount(x.total, currency).sub(x.repayed),
      repaymentDue: repaymentDue.unix() * 1000,
      pastDueInDays: repaymentDue.diff(moment(), 'days'),
    };
  };
}
