import React from 'react';

import { MyStakes } from 'features/loans';

import * as views from './views';
import { useStyles } from './Stakes.style';

export const Stakes: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <views.Metrics />
      <div className={classes.loansTable}>
        <MyStakes filter="issued" title="Issued loans" />
      </div>
      <div className={classes.loansTable}>
        <MyStakes filter="pending" title="Pending loans" />
      </div>
    </div>
  );
};
