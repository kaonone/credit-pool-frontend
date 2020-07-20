import * as React from 'react';
import { empty } from 'rxjs';

import { Metric, Title, FormattedAmount, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

const tKeys = tKeysAll.components.metrics.myBalance;

export function AvailableBalance() {
  const { t } = useTranslate();

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);
  const [availableBalance, availableBalanceMeta] = useSubscribable(
    () => (account ? api.fundsModule.getAvailableBalance$(account) : empty()),
    [api, account],
  );

  return (
    <Metric
      title={<Title hint={t(tKeys.description.getKey())}>{t(tKeys.myBalance.getKey())}</Title>}
      value={
        <Loading meta={[accountMeta, availableBalanceMeta]}>
          {availableBalance && <FormattedAmount sum={availableBalance} />}
        </Loading>
      }
    />
  );
}
