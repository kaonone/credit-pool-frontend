import React from 'react';

import { useSubgraphPagination } from 'utils/react';
import { useMyGuaranteesQuery } from 'generated/gql/pool';
import { Loading } from 'components';

import { LoansTable } from '../components/LoansTable';

interface IProps {
  account: string;
}

function MyGuarantees(props: IProps) {
  const { account } = props;

  const { result, paginationView } = useSubgraphPagination(useMyGuaranteesQuery, {
    pledgers: [account.toLowerCase()],
    borrower: account.toLowerCase(),
  });

  const guarantees = result.data?.debts || [];

  return (
    <Loading gqlResults={result} progressVariant="circle">
      <LoansTable account={account} list={guarantees} withEarn paginationView={paginationView} />
    </Loading>
  );
}

export { MyGuarantees };
