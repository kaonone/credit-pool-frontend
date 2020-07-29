import React from 'react';

import * as metrics from 'features/metrics';

import { useStyles } from './Metrics.style';

export type MetricColumn = {
  metrics: React.FC[];
};

const columns: MetricColumn[] = [
  { metrics: [metrics.AllMyIssuedLoans, metrics.OutstandingLoans] },
  { metrics: [metrics.OverallAPY, metrics.ActiveAPYFromOutstandingLoans] },
  { metrics: [metrics.Risk] },
];

export const Metrics: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.root}>{columns.map(renderColumn)}</div>;

  function renderColumn(column: MetricColumn, index: number) {
    return (
      <div key={index} className={classes.column}>
        {column.metrics.map(renderMetric)}
      </div>
    );
  }

  function renderMetric(Metric: React.FC, index: number) {
    return (
      <div key={index} className={classes.columnElement}>
        <Metric />
      </div>
    );
  }
};
