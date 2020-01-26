import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useSubgraphPagination } from 'utils/react';
import { Loading } from 'components';
import { useOthersDebtsQuery } from 'generated/gql/pool';

import { LoansPanel } from '../LoansPanel/LoansPanel';
import { LoansTitle } from '../LoansTitle/LoansTitle';

interface IProps {
  account: string;
}

function Others(props: IProps) {
  const { account } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansList;

  const { result, paginationView } = useSubgraphPagination(useOthersDebtsQuery, {
    pledgers: [account],
    borrower: account,
  });
  const others = result.data?.debts || [];

  return (
    <Loading gqlResults={result} progressVariant="circle">
      <LoansPanel
        title={<LoansTitle title={t(tKeys.others.getKey())} />}
        account={account}
        list={others}
        withEarn
        paginationView={paginationView}
      />
    </Loading>
  );
}

export { Others };
