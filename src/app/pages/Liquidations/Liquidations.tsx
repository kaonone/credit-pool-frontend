import * as React from 'react';

import { Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

import { LiquidationsTable } from './views/LiquidationsTable/LiquidationsTable';
import { UpcomingLiquidationsTable } from './views/UpcomingLiquidationsTable/UpcomingLiquidationsTable';

export function Liquidations() {
  const api = useApi();

  const [liquidations, liquidationsMeta] = useSubscribable(
    () => api.loanModule.getLoansAvailableForLiquidation$(),
    [api],
    [],
  );

  const [upcomingLiquidations, upcomingLiquidationsMeta] = useSubscribable(
    () => api.loanModule.getLoansUpcomingForLiquidation$(),
    [api],
    [],
  );

  return (
    <Loading meta={[liquidationsMeta, upcomingLiquidationsMeta]} progressVariant="circle">
      <LiquidationsTable loansToLiquidate={liquidations} />
      <UpcomingLiquidationsTable upcomingLoans={upcomingLiquidations} />
    </Loading>
  );
}
