import * as React from 'react';

import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { LendContent } from './views/LendContent/LendContent';

export function Lend() {
  return <WithAccount>{({ account }) => <LendContent account={account} />}</WithAccount>;
}
