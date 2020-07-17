import * as React from 'react';
import cn from 'classnames';

import { Grid, Card, CardContent } from 'components';
import { PoolBalanceChart } from 'features/balance';
import { makeStyles } from 'utils/styles';
import {
  PoolSize,
  PoolSize24h,
  PoolAPY,
  AverageLoanAPY,
  ActiveMembers,
  ActiveMembers24h,
  LoanVolumeRequested,
  LoanVolumeGranted,
  AverageLoanSize,
} from 'features/metrics';

export function StatsPage() {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid container className={classes.row}>
        <Grid item xs>
          <Card className={classes.card}>
            <CardContent>
              <PoolSize />
              <PoolSize24h />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className={cn(classes.card, classes.withBorder)}>
            <CardContent>
              <PoolAPY />
              <AverageLoanAPY />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.card}>
            <CardContent>
              <ActiveMembers />
              <ActiveMembers24h />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs>
          <Card className={classes.card}>
            <CardContent>
              <PoolBalanceChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.card}>
            <CardContent>
              <LoanVolumeRequested />
              <LoanVolumeGranted />
              <AverageLoanSize />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.card}>
            <CardContent>
              <PoolSize />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    boxShadow: 'none',
  },
  withBorder: {
    borderLeft: '1px solid rgba(255,255,255,0.1)',
    borderRight: '1px solid rgba(255,255,255,0.1)',
    paddingLeft: 56,
    paddingRight: 56,
    marginRight: 50,
    marginLeft: 50,
  },
  row: {
    padding: 50,
  },
}));
