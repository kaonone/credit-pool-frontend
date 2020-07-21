import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint } from 'components';
import { useDistributionEventsQuery } from 'generated/gql/pool';
import { useSubgraphPagination } from 'utils/react';

import * as tableData from './tableData';

function convertDistibutions(list: any, dealsList: any): tableData.Order[] {
  return list.map((order: any) => {
    return {
      date: order.date,
      profit: order.amount,
      claimed: order.claimed,
      usersLength: order.poolState.usersLength,
      deals: dealsList,
    };
  });
}

const dealsListMock = [
  {
    date: 1321321321321,
    address: '1351cz3x51c65z4c6',
    currency: 321651651,
  },
  {
    date: 1321321321321,
    address: '1351cz3x51c65z4c6',
    currency: 321651651,
  },
];

export function Profit() {
  const classes = useStyles();

  const { result } = useSubgraphPagination(useDistributionEventsQuery, {});
  const list = result.data?.distributionEvents || [];

  const entries = convertDistibutions(list, dealsListMock);

  return (
    <div className={classes.root}>
      <Loading gqlResults={result}>
        {!list.length ? (
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <NewTable.Component
            withOuterPadding
            columns={tableData.columnsWithSubtable}
            entries={entries}
          />
        )}
      </Loading>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
  }),
  { name: 'MySummary' },
);
