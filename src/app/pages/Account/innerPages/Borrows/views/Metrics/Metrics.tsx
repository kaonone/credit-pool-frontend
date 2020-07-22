import React from 'react';

import { AvailableLoansChart } from 'components';
import { YourMaxAvailableCredit } from 'features/metrics';

import { useStyles } from './Metrics.style';

export type MetricColumn = {
  metrics: React.FC[];
};

export const Metrics: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.yourMaxAvalaibleCreditMetric}>
        <YourMaxAvailableCredit />
      </div>
      <div className={classes.totalLoans}>
        <AvailableLoansChart />
      </div>
    </div>
  );
};
