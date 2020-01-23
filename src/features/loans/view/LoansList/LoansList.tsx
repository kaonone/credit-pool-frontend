import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useSubgraphPagination } from 'utils/react';
import { Loading, Hint, Grid } from 'components';
import { useOthersDebtsQuery, useMyLoansQuery, useMyGuaranteesQuery } from 'generated/gql/pool';

import { LoansPanel } from '../LoansPanel/LoansPanel';
import { LoansTitle } from '../LoansTitle/LoansTitle';

function LoansList() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansList;
  const tKeysApp = tKeysAll.app;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const { result: myLoansResult, paginationView: myLoansPaginationView } = useSubgraphPagination(
    useMyLoansQuery,
    {
      address: account || '',
    },
  );

  const loans = myLoansResult.data?.debts || [];

  const {
    result: myGuaranteesResult,
    paginationView: myGuaranteesPaginationView,
  } = useSubgraphPagination(useMyGuaranteesQuery, {
    address: account || '',
    addressInBytes: account || '',
  });

  const guarantees = myGuaranteesResult.data?.debts || [];

  const { result: othersResult, paginationView: othersPaginationView } = useSubgraphPagination(
    useOthersDebtsQuery,
    {
      address: account || '',
      addressInBytes: account || '',
    },
  );
  const others = othersResult.data?.debts || [];

  return (
    <Loading meta={[accountMeta]} gqlResults={[myLoansResult, myGuaranteesResult, othersResult]}>
      {account ? (
        <Grid container>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.myLoans.getKey())} />}
              account={account}
              list={loans}
              expanded
              paginationView={myLoansPaginationView}
            />
          </Grid>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.myGuarantees.getKey())} />}
              account={account}
              list={guarantees}
              withEarn
              paginationView={myGuaranteesPaginationView}
            />
          </Grid>
          <Grid item xs={12}>
            <LoansPanel
              title={<LoansTitle title={t(tKeys.others.getKey())} />}
              account={account}
              list={others}
              withEarn
              paginationView={othersPaginationView}
            />
          </Grid>
        </Grid>
      ) : (
        <Hint>{t(tKeysApp.connectingWarning.getKey())}</Hint>
      )}
    </Loading>
  );
}

export { LoansList };
