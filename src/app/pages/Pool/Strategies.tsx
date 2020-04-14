import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Button } from 'components';
import { routes } from 'app/routes';
import { GetLoanButton, PTokenBuyingButton } from 'features/cashExchange';

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
          actionButton={<PTokenBuyingButton fullWidth color="primary" variant="contained" />}
        />
      </Grid>
      <Grid item xs={4}>
        <StrategyCard
          title="Lending"
          primaryMetric="130 proposals"
          secondaryMetric="~60% APR"
          description="High interest, high risk"
          actionButton={
            <Button
              component={Link}
              fullWidth
              color="primary"
              variant="contained"
              to={routes.proposals.getRedirectPath()}
            >
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
          actionButton={<GetLoanButton />}
        />
      </Grid>
    </Grid>
  );
}
