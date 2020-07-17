import * as React from 'react';

import { AuthButton } from 'features/auth';
import { Typography, Loading, NewTable } from 'components';
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

      <div style={{ marginTop: '30px' }}>
        <NewTable.Component
          columns={tableData.columns}
          entries={tableData.entries}
          withStripes
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
