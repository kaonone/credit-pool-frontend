import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { NewTable } from 'components';

import * as tableData from './tableData';

export function Profit() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NewTable.Component
        withOuterPadding
        columns={tableData.columnsWithSubtable}
        entries={tableData.entries}
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
