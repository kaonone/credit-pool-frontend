import BN from 'bn.js';

export function calcCollateral(fullLoanStake: BN | undefined, stakedValue: string) {
  const rawProgressInPercents = fullLoanStake
    ? new BN(stakedValue).muln(10000).div(fullLoanStake)
    : new BN(0);
  return Math.min(100, rawProgressInPercents.toNumber() / 100);
}
