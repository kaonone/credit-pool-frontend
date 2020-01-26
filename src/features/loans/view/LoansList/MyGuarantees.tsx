import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useSubgraphPagination } from 'utils/react';
import { Loading } from 'components';
import { useMyGuaranteesQuery } from 'generated/gql/pool';

import { LoansPanel } from '../LoansPanel/LoansPanel';
import { LoansTitle } from '../LoansTitle/LoansTitle';

interface IProps {
  account: string;
}

function MyGuarantees(props: IProps) {
  const { account } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.loans.loansList;

  const { result, paginationView } = useSubgraphPagination(useMyGuaranteesQuery, {
    pledgers: [account],
    borrower: account,
  });

  const guarantees = result.data?.debts || [];

  return (
    <Loading gqlResults={result} progressVariant="circle">
      <LoansPanel
        title={<LoansTitle title={t(tKeys.myGuarantees.getKey())} />}
        account={account}
        list={guarantees}
        withEarn
        paginationView={paginationView}
      />
    </Loading>
  );
}

export { MyGuarantees };
