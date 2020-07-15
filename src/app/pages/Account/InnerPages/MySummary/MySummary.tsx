import * as React from 'react';
import Divider from '@material-ui/core/Divider';

import { MyBalance, MyPoolShare, APY, AKRO } from 'features/metrics';
import { Grid, PortfolioSnapshot, ComingSoon } from 'components';
import { makeStyles } from 'utils/styles';

export function MySummary() {
  const classes = useStyles();

  return (
    <div>
      <Grid item container xs={12}>
        <Grid item xs className={classes.metric}>
          <MyBalance />
        </Grid>
        <Grid item xs className={classes.metric}>
          <MyPoolShare />
        </Grid>
        <Divider orientation="vertical" className={classes.divider} />
        <Grid item xs className={classes.metric}>
          <APY />
        </Grid>
        <Grid item xs className={classes.metric}>
          <AKRO />
        </Grid>
      </Grid>
      <Divider className={classes.contentDivider} />
      <Grid container justify="space-between">
        <Grid item xs={5}>
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
          <ComingSoon />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    metric: {
      height: 200,
    },
    divider: {
      height: 119,
      marginLeft: 60,
      marginRight: 60,
    },
    contentDivider: {
      marginTop: 45,
      marginBottom: 45,
    },
  }),
  { name: 'MySummary' },
);
