import * as React from 'react';

import { PersonalInformation } from 'features/personalInformation';
import { Grid } from 'components';

import { PoolBalanceChart } from './PoolBalanceChart';
import { UserBalanceChart } from './UserBalanceChart';

export function OverviewPage() {
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
