import * as React from 'react';

import { Grid } from 'components';
import { PoolBalanceChart } from 'features/balance';

import { PersonalInformation } from './PoolInformation/PoolInformation';
import { Distributions } from './Distributions/Distributions';

export function StatsPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PoolBalanceChart />
      </Grid>
      <Grid item xs={6}>
        <Distributions />
      </Grid>
      <Grid item xs={6}>
        <PersonalInformation />
      </Grid>
    </Grid>
  );
}
