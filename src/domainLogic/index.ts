import BN from 'bn.js';

import { PercentAmount, LiquidityAmount } from 'model/entities';
import { IToBN } from 'model/types';
import { bnToBn } from 'utils/bn';

export function calcShare(
  fullValue: BN | IToBN | string,
  currentValue: BN | IToBN | string,
): PercentAmount {
  return new PercentAmount(bnToBn(currentValue)).div(bnToBn(fullValue)).mul(100);
}

export function calcLoanAPY(myInterestShare: PercentAmount, loanAPR: PercentAmount): PercentAmount {
  return new PercentAmount(myInterestShare).mul(loanAPR).div(100);
}

export function calcLoanProfit(
  myAPY: PercentAmount,
  myStakeCost: LiquidityAmount,
): LiquidityAmount {
  return new LiquidityAmount(myAPY, myStakeCost.currency).mul(myStakeCost).div(100);
}
