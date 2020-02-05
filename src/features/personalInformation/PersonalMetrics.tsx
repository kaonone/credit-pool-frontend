import React, { useMemo } from 'react';
import BN from 'bn.js';
import { of } from 'rxjs';

import { useMyUserSubscription } from 'generated/gql/pool';
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

  const lCredit = new BN(myUser?.credit || '0');

  const prevLAvailableBalance = new BN(myUser?.lBalance || '0');
  const prevLLocked = new BN(myUser?.lLockedSum || '0').add(new BN(myUser?.lInterestSum || '0'));
  const prevLTotal = prevLAvailableBalance.add(prevLLocked);

  const pAvailableBalance = new BN(myUser?.pBalance || '0');
  const pLocked = new BN(myUser?.pLockedSum || '0').add(new BN(myUser?.pInterestSum || '0'));

  const [lAvailableBalance, lAvailableBalanceMeta] = useSubscribable(
    () =>
      pAvailableBalance.isZero()
        ? of(new BN(0))
        : api.fundsModule.convertPtkToDaiExit$(pAvailableBalance.toString()),
    [pAvailableBalance.toString()],
    new BN(0),
  );

  const [lLocked, lLockedMeta] = useSubscribable(
    () =>
      pLocked.isZero() ? of(new BN(0)) : api.fundsModule.convertPtkToDaiExit$(pLocked.toString()),
    [pLocked.toString()],
    new BN(0),
  );

  const lTotal = useMemo(() => lAvailableBalance.add(lLocked), [
    lAvailableBalance.toString(),
    lLocked.toString(),
  ]);

  const metrics = React.useMemo<IMetric[]>(
    () => [
      {
        title: t(tKeys.deposit.getKey()),
        value: lTotal.toString(),
        previousValue: prevLTotal.toString(),
        token: 'dai',
        isCashMetric: true,
      },
      {
        title: t(tKeys.availableBalance.getKey()),
        value: lAvailableBalance.toString(),
        previousValue: prevLAvailableBalance.toString(),
        token: 'dai',
        isCashMetric: true,
      },
      {
        title: t(tKeys.locked.getKey()),
        value: lLocked.toString(),
        previousValue: prevLLocked.toString(),
        token: 'dai',
        isCashMetric: true,
      },
      {
        title: t(tKeys.credit.getKey()),
        value: lCredit.toString(),
        token: 'dai',
        isCashMetric: true,
      },
    ],
    [
      t,
      lTotal.toString(),
      prevLTotal.toString(),
      lAvailableBalance.toString(),
      prevLAvailableBalance.toString(),
      lLocked.toString(),
      prevLLocked.toString(),
      lCredit.toString(),
    ],
  );

  return (
    <Loading
      gqlResults={myUserResult}
      meta={[accountMeta, lAvailableBalanceMeta, lLockedMeta]}
      progressVariant="circle"
    >
      <MetricsList {...props} metrics={metrics} />
    </Loading>
  );
}

export { PersonalMetrics };
