import { LiquidityAmount } from 'model/entities';

export type LoanToLiquidate = {
  borrower: string;
  debtID: string;
  loanGranted: LiquidityAmount;
  repaymentDue: string;
  pastDue: string;
};

export type UpcomingLoanToLiquidate = {
  borrower: string;
  loanGranted: LiquidityAmount;
  repaymentDue: string;
};
