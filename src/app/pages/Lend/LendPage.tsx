import * as React from 'react';

import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { LendContent } from './views/LendContent/LendContent';

export function LendPage() {
  return <WithAccount>{({ account }) => <LendContent account={account} />}</WithAccount>;
}
