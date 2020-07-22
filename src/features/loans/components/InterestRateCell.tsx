import React from 'react';

import { FormattedAmount } from 'components';
import { PercentAmount } from 'model/entities';

type Props = {
  amount: string;
};

export function InterestRateCell({ amount }: Props) {
  // TODO: use api.loanModule.getAprDecimals$() instead of 10
  const percentAmount = new PercentAmount(amount).div(10);
  return <FormattedAmount sum={percentAmount} variant="plain" />;
}
