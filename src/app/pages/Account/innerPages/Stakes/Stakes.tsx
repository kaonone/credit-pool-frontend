import React from 'react';

import * as views from './views';
import { useStyles } from './Stakes.style';

export const Stakes: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <views.Metrics />
      <div className={classes.issuedLoansTable}>
        {renderTableTitle('Issued loans')}
        <views.tables.IssuedLoans />
      </div>
      <div className={classes.pendingLoansTable}>
        {renderTableTitle('Pending loans')}
        <views.tables.PendingLoans />
      </div>
    </div>
  );

  function renderTableTitle(title: string) {
    return <div className={classes.tableTitle}>{title}</div>;
  }
};
