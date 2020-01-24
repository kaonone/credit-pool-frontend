import * as React from 'react';
import BN from 'bn.js';

import { PersonalInformation } from 'features/personalInformation';
import { Grid } from 'components';

import { PoolBalanceChart } from './PoolBalanceChart';
import { UserBalanceChart } from './UserBalanceChart';

export function OverviewPage() {
  console.log(
    new BN('13665444773567254331')
      .sub(new BN('40000000000000000000'))
      .div(new BN('40000000000000000000'))
      .muln(100), // -65
  );

  console.log(
    new BN('40000000000000000000')
      .sub(new BN('13665444773567254331'))
      .div(new BN('13665444773567254331'))
      .muln(100), // 192
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <PoolBalanceChart />
      </Grid>
      <Grid item xs={4}>
        <UserBalanceChart />
      </Grid>
      <Grid item xs={4}>
        <PersonalInformation />
      </Grid>
    </Grid>
  );
}
