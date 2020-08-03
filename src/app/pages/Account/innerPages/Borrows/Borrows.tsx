import React from 'react';

import * as views from './views';
import { useStyles } from './Borrows.style';
import { WithAccount } from '../../../../components/WithAccount/WithAccount';

export const Borrows: React.FC = () => {
  const classes = useStyles();

  return (
    <WithAccount>
      {({ account }) => (
        <div className={classes.root}>
          <views.Metrics />
          <div className={classes.currentLoansTable}>
            {renderTableTitle('Current Loans')}
            <views.tables.CurrentLoans account={account} />
          </div>
          <div className={classes.pendingLoansTable}>
            {renderTableTitle('Pending Loans')}
            <views.tables.PendingLoans account={account} />
          </div>
        </div>
      )}
    </WithAccount>
  );

  function renderTableTitle(title: string) {
    return <div className={classes.tableTitle}>{title}</div>;
  }
};
