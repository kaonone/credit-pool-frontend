import React from 'react';

import * as views from './views';
import { useStyles } from './Stakes.style';
import { MyLoansTable } from 'features/loans/components/MyLoansTable';

export const Stakes: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <views.Metrics />
      <div className={classes.issuedLoansTable}>
        {renderTableTitle('Issued loans')}
        <MyLoansTable type="issued" />
      </div>
      <div className={classes.pendingLoansTable}>
        {renderTableTitle('Pending loans')}
        <MyLoansTable type="pending" />
      </div>
    </div>
  );

  function renderTableTitle(title: string) {
    return <div className={classes.tableTitle}>{title}</div>;
  }
};
