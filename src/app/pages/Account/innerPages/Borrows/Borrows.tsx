import React from 'react';

import * as views from './views';
import { useStyles } from './Borrows.style';

export const Borrows: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <views.Metrics />
      <div className={classes.currentLoansTable}>
        {renderTableTitle('Current Loans')}
        <views.tables.CurrentLoans />
      </div>
      <div className={classes.pendingLoansTable}>
        {renderTableTitle('Pending Loans')}
        <views.tables.PendingLoans />
      </div>
    </div>
  );

  function renderTableTitle(title: string) {
    return <div className={classes.tableTitle}>{title}</div>;
  }
};
