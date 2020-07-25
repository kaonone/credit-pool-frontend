import { LiquidityAmount, PercentAmount } from 'model/entities';
import { PartialDebt } from 'features/loans/components/types';

export type UserDebt = {
  borrower: string;
  total: LiquidityAmount;
  lStaked: LiquidityAmount;
  apr: PercentAmount;
  dueDate: Date | null;
  rawDebt: PartialDebt;
};
