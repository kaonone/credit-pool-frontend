import * as React from 'react';

import { AuthButton } from 'features/auth';
import {
  Typography,
  Loading,
  NewTable,
  Grid,
  AvailableLoansChart,
  DeFiScoreChart,
  Label,
} from 'components';
import { SwitchInput, RadioGroupInput, RadioButton } from 'components/inputs';
import { useSubgraphPagination } from 'utils/react';
import { useUsersQuery } from 'generated/gql/pool';
import { BuyingShareButton } from 'features/buyShare';
import { CreatingLoanProposalButton } from 'features/createLoanProposal';

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

      <Grid container spacing={2}>
        <Grid item xs>
          <CreatingLoanProposalButton variant="contained" color="primary" />
        </Grid>
        <Grid item xs>
          <BuyingShareButton variant="contained" color="primary" />
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
        <SwitchInput
          label={
            <Label inline hint="This is description">
              Infinite unlock
            </Label>
          }
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

function DemoRadioButtons() {
  const [value, setValue] = React.useState('slow');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <RadioGroupInput onChange={handleChange} value={value} row>
      <RadioButton value="slow" label="Slow" />
      <RadioButton value="standard" label="Standard" />
      <RadioButton value="fast" label="Fast" />
    </RadioGroupInput>
  );
}
