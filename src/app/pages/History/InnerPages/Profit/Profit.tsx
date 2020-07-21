import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { NewTable } from 'components';
// import { useDistributionEventsQuery } from 'generated/gql/pool';
// import { useSubgraphPagination } from 'utils/react';

import * as tableData from './tableData';

const entries: tableData.Order[] = [
  {
    date: '2012-01-02',
    profit: '$20000',
    claimed: [
      { currency: 10, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
      { currency: 20, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
      { currency: 70, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
    ],
  },
  {
    date: '2013-02-04',
    profit: '$10000',
    claimed: [
      { currency: 200, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
      { currency: 500, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
      { currency: 300, address: '0xz230a0sd0z0xc0wa20', date: '2012-01-02' },
    ],
  },
];

// const { result } = useSubgraphPagination(useDistributionEventsQuery, {});
// const list = result.data?.distributionEvents || [];

export function Profit() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NewTable.Component
        withOuterPadding
        columns={tableData.columnsWithSubtable}
        entries={entries}
      />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
  }),
  { name: 'MySummary' },
);
