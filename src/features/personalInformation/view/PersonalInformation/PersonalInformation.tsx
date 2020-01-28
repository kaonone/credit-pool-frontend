import React, { useMemo } from 'react';
import BN from 'bn.js';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { of } from 'rxjs';

import { useMyUserSubscription, useMyUserBalancesSubscription } from 'generated/gql/pool';
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

  const myUserResult = useMyUserSubscription({
    variables: {
      address: account?.toLowerCase() || '',
    },
  });

  const myUser = myUserResult.data?.user;

  const balanceInPtk = myUser?.pBalance || '0';
  const [availableBalance, availableBalanceMeta] = useSubscribable(
    () => (new BN(balanceInPtk).isZero() ? of(new BN(0)) : api.convertPtkToDaiExit$(balanceInPtk)),
    [balanceInPtk],
    new BN(0),
  );

  const lockedInPtk = myUser?.locked || '0';
  const [locked, lockedMeta] = useSubscribable(
    () => api.convertPtkToDaiForLocked$(lockedInPtk),
    [lockedInPtk],
    new BN(0),
  );

  const deposit = useMemo(() => availableBalance.add(locked).toString(), [
    availableBalance,
    locked,
  ]);

  const balancesResult = useMyUserBalancesSubscription({
    variables: {
      first: 1,
      address: account || '',
    },
  });

  const balanceDayAgo = balancesResult.data?.balances[0];

  const balanceInDaiDayAgo = balanceDayAgo?.lBalance || '0';

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
        previousValue: balanceInDaiDayAgo,
        token: 'dai',
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
    [t, deposit, availableBalance, balanceInDaiDayAgo, locked, myUser],
  );

  return (
    <Loading
      gqlResults={myUserResult}
      meta={[accountMeta, availableBalanceMeta, lockedMeta]}
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
            {metrics.map((metric, index) => (
              <Grid key={index} item xs={12}>
                <CashMetric {...metric} />
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
