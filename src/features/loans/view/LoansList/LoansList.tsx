import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, Hint, Grid } from 'components';

import { MyLoans } from './MyLoans';
import { MyGuarantees } from './MyGuarantees';
import { Others } from './Others';

function LoansList() {
  const { t } = useTranslate();
  const tKeysApp = tKeysAll.app;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  return (
    <Loading meta={accountMeta}>
      {account ? (
        <Grid container>
          <Grid item xs={12}>
            <MyLoans account={account} />
          </Grid>
          <Grid item xs={12}>
            <MyGuarantees account={account} />
          </Grid>
          <Grid item xs={12}>
            <Others account={account} />
          </Grid>
        </Grid>
      ) : (
        <Hint>{t(tKeysApp.connectingWarning.getKey())}</Hint>
      )}
    </Loading>
  );
}

export { LoansList };
