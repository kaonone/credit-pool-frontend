import BN from 'bn.js';

import { LiquidityAmount } from './entities';

export function calcWithdrawAmountBeforeFee({
  withdrawAmountAfterFee: userWithdrawAmountInDai,
  withdrawFeePercent,
  percentDivider,
}: {
  withdrawAmountAfterFee: LiquidityAmount;
  withdrawFeePercent: BN;
  percentDivider: BN;
}): LiquidityAmount {
  return userWithdrawAmountInDai.mul(percentDivider).div(percentDivider.sub(withdrawFeePercent));
}
