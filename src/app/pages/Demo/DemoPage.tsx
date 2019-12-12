import * as React from 'react';

import { AuthButton } from 'features/auth';
import { Typography, Loading } from 'components';
import { useSubgraphPagination } from 'utils/react';
import { useBalancesQuery } from 'generated/gql/dai-graphql';

export function DemoPage() {
  const { result, paginationView } = useSubgraphPagination(useBalancesQuery, {});

  return (
    <div>
      <AuthButton />
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
      <Loading gqlResults={result}>
        {result.data && (
          <pre>{result.data.balances.map(({ id, wad }) => `${id}\t${wad}`).join('\n')}</pre>
        )}
      </Loading>
      {paginationView}
    </div>
  );
}
