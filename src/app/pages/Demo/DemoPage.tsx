import * as React from 'react';

// loans - [my guarantees issued]

import { AuthButton } from 'features/auth';
import {
  Typography,
  Loading,
  NewTable,
  Grid,
  PoolCompositionChart,
  AvailableLoansChart,
  DeFiScoreChart,
} from 'components';
import { useSubgraphPagination } from 'utils/react';
import { useUsersQuery } from 'generated/gql/pool';

import * as tableData from './tableData';

export function DemoPage() {
  const { result, paginationView } = useSubgraphPagination(useUsersQuery, {});

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
      <Typography variant="h4" gutterBottom>
        Tables
      </Typography>
      <NewTable.Component columns={tableData.columnsWithSubtable} entries={tableData.entries} />

      <div style={{ marginTop: '30px' }}>
        <NewTable.Component columns={tableData.columns} entries={tableData.entries} withStripes />
      </div>

      <Grid container>
        <Grid item xs={4}>
          <PoolCompositionChart />
        </Grid>
        <Grid item xs={4}>
          <AvailableLoansChart />
        </Grid>
        <Grid item xs={4}>
          <DeFiScoreChart />
        </Grid>
      </Grid>

      <div style={{ marginTop: '30px' }}>
        <NewTable.Component
          columns={tableData.columnsWithoutExpandableRows}
          entries={tableData.entries}
          summary={{ renderLabel: () => 'Sum', renderValue: () => 13 }}
        />
      </div>
      <AuthButton />
      <Loading gqlResults={result}>
        {result.data && <pre>{JSON.stringify(result.data.users, null, 2)}</pre>}
      </Loading>
      {paginationView}
    </div>
  );
}
