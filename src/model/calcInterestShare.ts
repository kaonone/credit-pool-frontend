import BN from 'bn.js';

import { decimalsToWei } from 'utils/bn';

export function calcInterestShare(
  userStake: string | BN,
  fullLoanStake: string | BN,
  outputDecimals: number = 0,
): BN {
  const weiDecimals = decimalsToWei(outputDecimals);
  const interestMultiplayer = 2;

  return new BN(userStake)
    .muln(100)
    .muln(interestMultiplayer)
    .mul(weiDecimals)
    .div(new BN(fullLoanStake));
}
