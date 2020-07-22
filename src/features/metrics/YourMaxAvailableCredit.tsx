import * as React from 'react';

import { Label, FormattedAmount, Metric } from 'components';
import { liquidityAmount } from 'utils/mock';

export function YourMaxAvailableCredit() {
  return (
    <Metric
      title={<Label>Your Maximum Available Credit</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
