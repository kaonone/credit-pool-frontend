import React from 'react';

import { Grid, Button } from 'components';

import { StrategyCard } from './StrategyCard';

export function Strategies() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <StrategyCard
          title="Buy share"
          primaryMetric="$560,234"
          secondaryMetric="~15%"
          description="Some text"
          actionButton={
            <Button fullWidth color="primary" variant="contained">
              Buy
            </Button>
          }
        />
      </Grid>
      <Grid item xs={4}>
        <StrategyCard
          title="Lending"
          primaryMetric="130 proposals"
          secondaryMetric="~60% APR"
          description="High interest, high risk"
          actionButton={
            <Button fullWidth color="primary" variant="contained">
              Lend
            </Button>
          }
        />
      </Grid>
      <Grid item xs={4}>
        <StrategyCard
          title="Borrowing"
          primaryMetric="$1,120,468"
          secondaryMetric="~20%"
          description="More 30% approved"
          actionButton={
            <Button fullWidth color="primary" variant="contained">
              Borrow
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
}
