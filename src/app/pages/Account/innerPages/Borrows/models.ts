import { LiquidityAmount, PercentAmount } from 'model/entities';
import { PartialDebt } from 'features/loans/components/types';

export type UserDebt = {
  borrower: string;
  body: LiquidityAmount;
  lStaked: LiquidityAmount;
  apr: PercentAmount;
  dueDate: Date | null;
  rawDebt: PartialDebt;
};
