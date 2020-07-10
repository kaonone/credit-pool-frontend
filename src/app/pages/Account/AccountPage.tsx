import React from 'react';

import { MyBalance, MyPoolShare, APY } from 'components/Metrics';
import { Grid, Typography } from 'components';
import { MyLoans, MyGuarantees } from 'features/loans';
import { makeStyles } from 'utils/styles';

import { WithAccount } from '../../components/WithAccount/WithAccount';

export function AccountPage() {
  const classes = useStyles();
  return (
    <WithAccount>
      {({ account }) => (
        <Grid container spacing={3}>
          <Grid item container xs={12}>
            <Grid item xs className={classes.metric}>
              <MyBalance
                decimal={{
                  integral: '126,917',
                  fractional: '25',
                }}
                onDepositClick={() => undefined}
              />
            </Grid>
            <Grid item xs className={classes.metric}>
              <MyPoolShare
                percent="0.15"
                totalPoolLiquidityDecimal={{
                  integral: '2,750,800',
                  fractional: '00',
                }}
              />
            </Grid>
            <Grid item xs className={classes.metric}>
              <APY percent="11.06" period="24h" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Lending
            </Typography>
            <MyGuarantees account={account} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Borrowing
            </Typography>
            <MyLoans account={account} />
          </Grid>
        </Grid>
      )}
    </WithAccount>
  );
}

const useStyles = makeStyles(
  () => ({
    metric: {
      height: 400,
    },
  }),
  { name: 'AccountPage' },
);
