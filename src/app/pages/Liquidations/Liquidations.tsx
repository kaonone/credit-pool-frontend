import * as React from 'react';

import { Liquidations } from 'features/loans';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

export function LiquidationsPage() {
  return <WithAccount>{({ account }) => <Liquidations account={account} />}</WithAccount>;
}
