import React, { useMemo } from 'react';
import BN from 'bn.js';
import { of } from 'rxjs';
import moment from 'moment';

import { useMyUserSubscription, useMyUserBalanceByDateSubscription } from 'generated/gql/pool';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { IMetric, Loading, MetricsList } from 'components';

const tKeys = tKeysAll.features.personalInformation;

type Props = Pick<React.ComponentProps<typeof MetricsList>, 'orientation' | 'withDividers'>;

function PersonalMetrics(props: Props) {
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
    () =>
      new BN(balanceInPtk).isZero()
        ? of(new BN(0))
        : api.fundsModule.convertPtkToDaiExit$(balanceInPtk),
    [balanceInPtk],
    new BN(0),
  );

  const lockedInPtk = myUser?.pLockedSum || '0';
  const [locked, lockedMeta] = useSubscribable(
    () => api.fundsModule.convertPtkToDaiForLocked$(lockedInPtk),
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

  const metrics = React.useMemo<IMetric[]>(
    () => [
      {
        title: t(tKeys.deposit.getKey()),
        value: deposit.toString(),
        token: 'dai',
        isCashMetric: true,
      },
      {
        title: t(tKeys.availableBalance.getKey()),
        value: availableBalance.toString(),
        previousValue: balanceInDaiDayAgo,
        token: 'dai',
        isCashMetric: true,
      },
      {
        title: t(tKeys.locked.getKey()),
        value: locked.toString(),
        token: 'dai',
        isCashMetric: true,
      },
      {
        title: t(tKeys.credit.getKey()),
        value: myUser?.credit || '0',
        token: 'dai',
        isCashMetric: true,
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
      <MetricsList {...props} metrics={metrics} />
    </Loading>
  );
}

export { PersonalMetrics };
