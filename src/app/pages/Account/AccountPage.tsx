import React from 'react';

import { MyBalance } from 'components/Metrics';
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
          <Grid item xs={12} className={classes.metric}>
            <MyBalance
              decimal={{
                integral: '126,917',
                fractional: '25',
              }}
              onDepositClick={() => undefined}
            />
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
