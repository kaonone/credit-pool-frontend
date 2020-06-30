import React from 'react';

import { useTranslate } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, Hint } from 'components';
import { zeroAddress } from 'utils/mock';

interface Props {
  children: React.ReactNode | ((props: { account: string }) => React.ReactNode);
}

// TODO move to another place
export function WithAccount({ children }: Props) {
  const { t, tKeys } = useTranslate();

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const child =
    typeof children === 'function' ? children({ account: account || zeroAddress }) : children;

  return (
    <Loading meta={accountMeta}>
      {account ? child : <Hint>{t(tKeys.app.connectingWarning.getKey())}</Hint>}
    </Loading>
  );
}
