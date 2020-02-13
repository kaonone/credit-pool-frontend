import * as React from 'react';

import { Grid } from 'components';

import { UserBalanceChart } from './UserBalanceChart';
import { PersonalInformation } from './PersonalInformation/PersonalInformation';

export function OverviewPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <UserBalanceChart />
      </Grid>
      <Grid item xs={4}>
        <PersonalInformation />
      </Grid>
    </Grid>
  );
}
