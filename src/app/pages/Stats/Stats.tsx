import * as React from 'react';
import cn from 'classnames';

import { Grid, Card, CardContent } from 'components';
import { PoolBalanceChart } from 'features/balance';
import { PoolCompositionChart } from 'features/poolInfo';
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
  LoanApprovalRatio,
} from 'features/metrics';

export function StatsPage() {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item className={cn(classes.row, classes.withHorizontalBorder)}>
        <Grid container>
          <Grid item xs>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <PoolSize />
                <div className={classes.metricContainer}>
                  <PoolSize24h />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs className={cn(classes.withVerticalBorder, classes.centerBlock)}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <PoolAPY />
                <AverageLoanAPY />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <ActiveMembers />
                <ActiveMembers24h />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs>
          <PoolBalanceChart />
        </Grid>
        <Grid item xs className={classes.centerBlock}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <LoanVolumeRequested />
              <LoanVolumeGranted />
              <AverageLoanSize />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <PoolCompositionChart />
              <LoanApprovalRatio />
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
  withVerticalBorder: {
    borderLeft: '1px solid rgba(255,255,255,0.1)',
    borderRight: '1px solid rgba(255,255,255,0.1)',
  },
  centerBlock: {
    paddingLeft: 56,
    paddingRight: 56,
    marginRight: 50,
    marginLeft: 50,
  },
  withHorizontalBorder: {
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  row: {
    padding: '50px 0',
    margin: '0 50px',
    width: 'calc(100% - 100px)',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 !important',
    height: '100%',
  },
  metricContainer: {
    marginTop: 30,
  },
}));
