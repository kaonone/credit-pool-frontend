import * as React from 'react';

import { Grid, Card, CardContent } from 'components';
// import { PoolBalanceChart } from 'features/balance';
import { makeStyles } from 'utils/styles';
import { PoolSize, PoolSize24h } from 'features/metrics';

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
          <Card className={classes.card}>
            <CardContent>
              <PoolSize />
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
      <Grid container className={classes.row}>
        <Grid item xs>
          <Card className={classes.card}>
            <CardContent>
              <PoolSize />
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
  },
  row: {
    padding: 50,
  },
}));

// <PoolBalanceChart />
