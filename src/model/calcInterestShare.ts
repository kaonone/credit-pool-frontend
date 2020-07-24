import BN from 'bn.js';

import { bnToBn } from 'utils/bn';

import { PercentAmount } from './entities';
import { IToBN } from './types';

export function calcInterestShare(
  userStake: string | BN | IToBN,
  fullLoanStake: string | BN | IToBN,
): PercentAmount {
  return new PercentAmount(bnToBn(userStake)).mul(100).div(bnToBn(fullLoanStake));
}
