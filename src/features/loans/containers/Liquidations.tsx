import React from 'react';
import moment from 'moment';
import BN from 'bn.js';

import { useSubgraphPagination, useSubscribable } from 'utils/react';
import { useDebtsAvailableForLiquidationQuery } from 'generated/gql/pool';
import { Loading } from 'components';
import { useApi } from 'services/api';

import { LoansTable } from '../components/LoansTable';

export function Liquidations() {
  const api = useApi();
  const [dueTimeout, dueTimeoutMeta] = useSubscribable(
    () => api.loanModule.getDuePaymentTimeout$(),
    [],
    new BN(0),
  );

  const duePaymentDate = moment()
    .subtract(dueTimeout.toNumber(), 'seconds')
    .unix();

  const { result, paginationView } = useSubgraphPagination(useDebtsAvailableForLiquidationQuery, {
    liquidationDate: new BN(duePaymentDate).toString(),
  });
  const others = result.data?.debts || [];

  return (
    <Loading gqlResults={result} meta={dueTimeoutMeta} progressVariant="circle">
      <LoansTable list={others} paginationView={paginationView} />
    </Loading>
  );
}
