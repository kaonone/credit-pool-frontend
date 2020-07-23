import React from 'react';

import { MyStakes } from 'features/loans';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import * as views from './views';
import { useStyles } from './Stakes.style';

export const Stakes: React.FC = () => {
  const classes = useStyles();

  return (
    <WithAccount>
      {({ account }) => (
        <div className={classes.root}>
          <views.Metrics />
          <div className={classes.loansTable}>
            <MyStakes filter="issued" title="Issued loans" account={account} />
          </div>
          <div className={classes.loansTable}>
            <MyStakes filter="pending" title="Pending loans" account={account} />
          </div>
        </div>
      )}
    </WithAccount>
  );
};
