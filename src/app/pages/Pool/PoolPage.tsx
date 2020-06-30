import React from 'react';

import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { Strategies } from './Strategies/Strategies';

export function PoolPage() {
  return (
    <WithAccount>
      <Strategies />
    </WithAccount>
  );
}
