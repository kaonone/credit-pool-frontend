import * as React from 'react';

import { Grid } from 'components';

import { UserBalanceChart } from './UserBalanceChart';
import { PersonalInformation } from './PoolInformation/PoolInformation';
import { Distributions } from './Distributions/Distributions';

export function OverviewPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <UserBalanceChart />
      </Grid>
      <Grid item xs={4}>
        <Distributions />
      </Grid>
      <Grid item xs={4}>
        <PersonalInformation />
      </Grid>
    </Grid>
  );
}
