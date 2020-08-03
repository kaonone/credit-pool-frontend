import * as React from 'react';

import { Grid, Divider, Box } from 'components';
import { PoolBalanceChart } from 'features/balance';
import { PoolCompositionChart } from 'features/poolInfo';
import {
  AvgPoolAPY,
  PoolSize,
  PoolSize24h,
  AverageLoanAPY,
  ActiveMembers,
  ActiveMembers24h,
  LoanVolumeRequested,
  LoanVolumeGranted,
  AverageLoanSize,
  LoanApprovalRatio,
} from 'features/metrics';

export function Stats() {
  return (
    <Box p={[7, 6]}>
      <Grid container spacing={5}>
        <Grid item xs container spacing={3} direction="column" justify="space-between">
          <Grid item>
            <PoolSize />
          </Grid>
          <Grid item>
            <PoolSize24h />
          </Grid>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs container spacing={3} direction="column" justify="space-between">
          <Grid item>
            <AvgPoolAPY title="Pool APY" />
          </Grid>
          <Grid item>
            <AverageLoanAPY />
          </Grid>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs container spacing={3} direction="column" justify="space-between">
          <Grid item>
            <ActiveMembers />
          </Grid>
          <Grid item>
            <ActiveMembers24h />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider orientation="horizontal" />
        </Grid>

        <Grid item xs={4}>
          <PoolBalanceChart />
        </Grid>
        <Grid item xs container spacing={3} direction="column" justify="space-between">
          <Grid item>
            <LoanVolumeRequested />
          </Grid>
          <Grid item>
            <LoanVolumeGranted />
          </Grid>
          <Grid item>
            <AverageLoanSize />
          </Grid>
        </Grid>
        <Grid item xs container spacing={3} direction="column" justify="space-between">
          <Grid item>
            <PoolCompositionChart />
          </Grid>
          <Grid item>
            <LoanApprovalRatio />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
