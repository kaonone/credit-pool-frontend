import * as React from 'react';
import { empty } from 'rxjs';

import { FormattedAmount, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

type Props = {
  borrower: string;
  debtId: string;
};

export function AvailableForUnlock({ borrower, debtId }: Props) {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account$, []);

  const [pAvailableForUnlock, pAvailableForUnlockMeta] = useSubscribable(
    () =>
      account ? api.loanModule.calculatePAvailableForUnlock$(borrower, account, debtId) : empty(),
    [borrower, account, debtId],
  );

  const [availableForUnlockCost, availableForUnlockCostMeta] = useSubscribable(
    () =>
      account && pAvailableForUnlock
        ? api.fundsModule.getAvailableBalanceIncreasing$(
            account,
            pAvailableForUnlock.toString(),
            '0',
          )
        : empty(),
    [api, account, pAvailableForUnlock],
  );

  return (
    <Loading meta={[availableForUnlockCostMeta, pAvailableForUnlockMeta]}>
      {availableForUnlockCost && <FormattedAmount sum={availableForUnlockCost} variant="plain" />}
    </Loading>
  );
}
