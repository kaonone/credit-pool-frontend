import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { Metric } from 'components/Metric/Metric';

import { useStyles } from './MetricsList.style';

export interface IMetric {
  title: string;
  value: React.ReactNode;
  profit?: React.ReactNode;
}

interface IProps {
  metrics: IMetric[];
  className?: string;
}

function MetricsList(props: IProps) {
  const { metrics, className } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center" className={className}>
      {metrics.map(({ title, value, profit }, index) => (
        <React.Fragment key={index}>
          {!!index && (
            <Grid item className={classes.dividerItem}>
              <Divider orientation="vertical" className={classes.divider} />
            </Grid>
          )}
          <Grid item>
            <Metric title={title} value={value} profit={profit} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

export { MetricsList };
