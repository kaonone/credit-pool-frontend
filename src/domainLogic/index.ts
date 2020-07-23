import BN from 'bn.js';

import { PercentAmount } from 'model/entities';

export function calcCollateral(fullLoanStake: BN | undefined, stakedValue: string): PercentAmount {
  const rawProgressInPercents = fullLoanStake
    ? new BN(stakedValue).muln(10000).div(fullLoanStake)
    : new BN(0);
  return new PercentAmount(Math.min(100, rawProgressInPercents.toNumber() / 100));
}
