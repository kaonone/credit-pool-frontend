import BN from 'bn.js';

import { Amount } from './entities';
import { ICurrency } from './types';

export function calcWithdrawAmountBeforeFee<T extends Amount<ICurrency>>({
  withdrawAmountAfterFee: userWithdrawAmountInDai,
  withdrawFeePercent,
  percentDivider,
}: {
  withdrawAmountAfterFee: T;
  withdrawFeePercent: BN;
  percentDivider: BN;
}): T {
  return userWithdrawAmountInDai.mul(percentDivider).div(percentDivider.sub(withdrawFeePercent));
}
