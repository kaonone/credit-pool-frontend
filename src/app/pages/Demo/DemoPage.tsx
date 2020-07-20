import * as React from 'react';

import { AuthButton } from 'features/auth';
import {
  Typography,
  Loading,
  NewTable,
  Grid,
  AvailableLoansChart,
  DeFiScoreChart,
  FormControlLabel,
  Radio,
} from 'components';
import { useSubgraphPagination } from 'utils/react';
import { useUsersQuery } from 'generated/gql/pool';

import * as tableData from './tableData';
import { RadioGroupInput } from 'components/inputs';

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
      <NewTable.Component
        withOuterPadding
        columns={tableData.columnsWithSubtable}
        entries={tableData.entries}
      />

      <div style={{ marginTop: '30px' }}>
        <NewTable.Component
          withOuterPadding
          columns={tableData.columns}
          entries={tableData.entries}
          withStripes
        />
      </div>

      <Grid container>
        <Grid item xs={6}>
          <AvailableLoansChart />
        </Grid>
        <Grid item xs={6}>
          <DeFiScoreChart />
        </Grid>
      </Grid>

      <div style={{ marginTop: '30px' }}>
        <NewTable.Component
          withOuterPadding
          columns={tableData.columnsWithoutExpandableRows}
          entries={tableData.entries}
          summary={{ renderLabel: () => 'Sum', renderValue: () => 13 }}
        />
      </div>
      <div style={{ margin: 30 }}>
        <DemoRadioButtons />
      </div>
      <AuthButton />
      <Loading gqlResults={result}>
        {result.data && <pre>{JSON.stringify(result.data.users, null, 2)}</pre>}
      </Loading>
      {paginationView}
    </div>
  );
}

function DemoRadioButtons() {
  const [value, setValue] = React.useState('slow');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <RadioGroupInput onChange={handleChange} value={value} row>
      <FormControlLabel value="slow" control={<Radio />} label="Slow" />
      <FormControlLabel value="standard" control={<Radio />} label="Standard" />
      <FormControlLabel value="fast" control={<Radio />} label="Fast" />
    </RadioGroupInput>
  );
}
