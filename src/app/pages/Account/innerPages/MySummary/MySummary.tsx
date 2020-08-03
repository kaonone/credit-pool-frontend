import * as React from 'react';
import Divider from '@material-ui/core/Divider';

import { MyBalance, MyPoolShare, AvgPoolAPY, AKRO } from 'features/metrics';
import { BuyingShareButton } from 'features/buyShare';
import { SellingShareButton } from 'features/sellShare';
import { Grid, PortfolioSnapshot, YieldSummary } from 'components';
import { makeStyles } from 'utils/styles';

export function MySummary() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs>
          <MyBalance />
        </Grid>
        <Grid item xs>
          <MyPoolShare />
        </Grid>
        <Divider orientation="vertical" className={classes.divider} flexItem />
        <Grid item xs>
          <AvgPoolAPY />
        </Grid>
        <Grid item xs>
          <AKRO />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            <Grid item xs>
              <BuyingShareButton variant="contained" color="primary" size="small" />
            </Grid>
            <Grid item xs>
              <SellingShareButton variant="contained" color="primary" size="small" />
            </Grid>
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
                apy: '0%',
                earned: '0',
                balance: '0',
              },
              {
                asset: 'USDC',
                apy: '0%',
                earned: '0',
                balance: '0',
              },
              {
                asset: 'USDT',
                apy: '0%',
                earned: '0',
                balance: '0',
              },
              {
                asset: 'TUSD',
                apy: '0%',
                earned: '0',
                balance: '0',
              },
            ]}
            loansIssued="0"
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
      margin: theme.spacing(0, 2),
    },
    contentDivider: {
      marginTop: 45,
      marginBottom: 45,
    },
  }),
  { name: 'MySummary' },
);
