import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { Metric } from 'components/Metric/Metric';
import { CashMetric } from 'components/CashMetric/CashMetric';
import { Token } from 'model/types';

import { useStyles } from './MetricsList.style';

export interface IMetric {
  title: React.ReactNode;
  value: string;
  previousValue?: string;
  subValue?: React.ReactNode;
  isCashMetric?: boolean;
  token?: Token;
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
      {metrics.map(({ title, value, previousValue, subValue, isCashMetric, token }, index) => (
        <React.Fragment key={index}>
          {!!index && (
            <Grid item className={classes.dividerItem}>
              <Divider orientation="vertical" className={classes.divider} />
            </Grid>
          )}
          <Grid item className={classes.metric}>
            {isCashMetric && token ? (
              <CashMetric title={title} value={value} previousValue={previousValue} token={token} />
            ) : (
              <Metric title={title} value={value} subValue={subValue} />
            )}
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

export { MetricsList };
