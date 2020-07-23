import BN from 'bn.js';

import { decimalsToWei } from 'utils/bn';

import { PercentAmount } from './entities';

export function calcInterestShare(
  userStake: string | BN,
  fullLoanStake: string | BN,
  outputDecimals: number = 0,
): PercentAmount {
  const weiDecimals = decimalsToWei(outputDecimals);
  return new PercentAmount(userStake).mul(weiDecimals).div(new BN(fullLoanStake));
}
