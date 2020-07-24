import BN from 'bn.js';

import { PercentAmount } from 'model/entities';
import { IToBN } from 'model/types';
import { bnToBn } from 'utils/bn';

export function calcShare(
  fullValue: BN | IToBN | string,
  currentValue: BN | IToBN | string,
): PercentAmount {
  return new PercentAmount(bnToBn(currentValue)).div(bnToBn(fullValue)).mul(100);
}

export function calcMyAPY(myInterestShare: PercentAmount, loanAPR: PercentAmount): PercentAmount {
  return new PercentAmount(myInterestShare).mul(loanAPR).div(100);
}
