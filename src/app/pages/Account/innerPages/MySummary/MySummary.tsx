import * as React from 'react';
import Divider from '@material-ui/core/Divider';

import { MyBalance, MyPoolShare, AvgPoolAPY, AKRO } from 'features/metrics';
import { Grid, PortfolioSnapshot, YieldSummary } from 'components';
import { makeStyles } from 'utils/styles';

export function MySummary() {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs container spacing={4}>
          <Grid item xs>
            <MyBalance />
          </Grid>
          <Grid item xs>
            <MyPoolShare />
          </Grid>
        </Grid>
        <Divider orientation="vertical" className={classes.divider} flexItem />
        <Grid item xs container spacing={4}>
          <Grid item xs>
            <AvgPoolAPY />
          </Grid>
          <Grid item xs>
            <AKRO />
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.contentDivider} />
      <Grid container spacing={6} justify="space-between">
        <Grid item xs={7}>
          <PortfolioSnapshot
            data={[
              {
                asset: 'DAI',
                apy: '0.25%',
                earned: '100,220.45',
                balance: '123,220.45',
              },
              {
                asset: 'USDC',
                apy: '0.25%',
                earned: '100,220.45',
                balance: '123,220.45',
              },
              {
                asset: 'USDT',
                apy: '0.25%',
                earned: '100,220.45',
                balance: '123,220.45',
              },
              {
                asset: 'TUSD',
                apy: '0.25%',
                earned: '100,220.45',
                balance: '123,220.45',
              },
            ]}
            loansIssued="6,193.38"
          />
        </Grid>
        <Grid item xs={5}>
          <YieldSummary />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(
  theme => ({
    divider: {
      margin: theme.spacing(0, 5),
    },
    contentDivider: {
      marginTop: 45,
      marginBottom: 45,
    },
  }),
  { name: 'MySummary' },
);
