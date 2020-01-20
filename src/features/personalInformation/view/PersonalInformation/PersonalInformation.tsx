import React from 'react';
import BN from 'bn.js';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useMyUserQuery, useMyUserBalancesQuery } from 'generated/gql/pool';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { GetLoanButton } from 'features/cashExchange';
import { useSubscribable } from 'utils/react';
import { CashMetric, ICashMetricProps, Loading } from 'components';

import { useStyles } from './PersonalInformation.style';

const tKeys = tKeysAll.features.personalInformation;

function PersonalInformation() {
  const classes = useStyles();
  const { t } = useTranslate();

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const myUserResult = useMyUserQuery({
    variables: {
      address: account || '',
    },
  });

  const myUser = myUserResult.data?.users[0];

  const balanceInPtk = myUser?.pBalance || '0';
  const [availableBalance, availableBalanceMeta] = useSubscribable(
    () => api.getDaiByPToken$(balanceInPtk),
    [balanceInPtk],
    new BN(0),
  );

  const lockedInPtk = myUser?.locked || '0';
  const [locked, lockedMeta] = useSubscribable(
    () => api.getDaiByPtkForLocked$(lockedInPtk),
    [lockedInPtk],
    new BN(0),
  );

  const [deposit, depositMeta] = useSubscribable(
    () => api.getDaiByPToken$(availableBalance.add(locked).toString()),
    [availableBalance, locked],
    new BN(0),
  );

  const balancesResult = useMyUserBalancesQuery({
    variables: {
      address: account || '',
    },
  });

  const balanceDayAgo = balancesResult.data?.balances[1];

  const balanceInDaiDayAgo = new BN(balanceDayAgo?.lBalance || '0');

  const userProfit = balanceInDaiDayAgo.isZero()
    ? new BN(0)
    : availableBalance
        .sub(balanceInDaiDayAgo)
        .div(balanceInDaiDayAgo)
        .muln(100);

  const metrics: ICashMetricProps[] = React.useMemo(
    () => [
      {
        title: t(tKeys.deposit.getKey()),
        value: deposit.toString(),
        token: 'dai',
      },
      {
        title: t(tKeys.availableBalance.getKey()),
        value: availableBalance.toString(),
        token: 'dai',
        profit: userProfit.toNumber() || 0,
      },
      {
        title: t(tKeys.locked.getKey()),
        value: locked.toString(),
        token: 'dai',
      },
      {
        title: t(tKeys.credit.getKey()),
        value: myUser?.credit || '0',
        token: 'dai',
      },
    ],
    [t, deposit, availableBalance, userProfit, locked, myUser],
  );

  return (
    <Loading
      gqlResults={myUserResult}
      meta={[accountMeta, availableBalanceMeta, lockedMeta, depositMeta]}
      progressVariant="circle"
    >
      <Card className={classes.root}>
        <CardContent>
          <Box mb={3}>
            <Typography className={classes.title} variant="subtitle2">
              {t(tKeys.title.getKey())}
            </Typography>
          </Box>
          <Grid container spacing={2} className={classes.metrics}>
            {metrics.map(({ title, value, token, profit }, index) => (
              <Grid key={index} item xs={12}>
                <CashMetric title={title} value={value} token={token} profit={profit} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <GetLoanButton />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Loading>
  );
}

export { PersonalInformation };
