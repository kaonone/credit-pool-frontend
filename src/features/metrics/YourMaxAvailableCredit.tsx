import * as React from 'react';
import { empty } from 'rxjs';

import { Label, FormattedAmount, Metric, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

export function YourMaxAvailableCredit() {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);
  const [max, maxMeta] = useSubscribable(
    () => (account ? api.loanModule.getMaxAvailableLoanSize$(account) : empty()),
    [api, account],
  );
  return (
    <Metric
      title={<Label>Your Maximum Available Credit</Label>}
      value={<Loading meta={maxMeta}>{max && <FormattedAmount sum={max} />}</Loading>}
    />
  );
}
