import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useSubgraphPagination } from 'utils/react';
import { Loading } from 'components';
import { useMyLoansQuery } from 'generated/gql/pool';

import { LoansPanel } from '../LoansPanel/LoansPanel';
import { LoansTitle } from '../LoansTitle/LoansTitle';

interface IProps {
  account: string;
}

function MyLoans(props: IProps) {
  const { account } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansList;

  const { result, paginationView } = useSubgraphPagination(useMyLoansQuery, {
    address: account,
  });

  const loans = result.data?.debts || [];

  return (
    <Loading gqlResults={result} progressVariant="circle">
      <LoansPanel
        title={<LoansTitle title={t(tKeys.myLoans.getKey())} />}
        account={account}
        list={loans}
        expanded
        paginationView={paginationView}
      />
    </Loading>
  );
}

export { MyLoans };
