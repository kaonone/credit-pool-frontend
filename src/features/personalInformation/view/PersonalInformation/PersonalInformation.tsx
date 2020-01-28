import React, { useMemo } from 'react';
import BN from 'bn.js';
import { of } from 'rxjs';
import moment from 'moment';

import { useMyUserSubscription, useMyUserBalanceByDateSubscription } from 'generated/gql/pool';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { GetLoanButton } from 'features/cashExchange';
import { useSubscribable } from 'utils/react';
import {
  CashMetric,
  ICashMetricProps,
  Loading,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from 'components';

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

  const dayAgoDate = React.useMemo(
    () =>
      moment()
        .subtract(1, 'day')
        .unix(),
    [],
  ); // Date in seconds

  const balancesDayAgoResult = useMyUserBalanceByDateSubscription({
    variables: {
      address: account || '',
      date: dayAgoDate.toString(),
    },
  });

  const balanceDayAgo = balancesDayAgoResult.data?.balances[0];

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
