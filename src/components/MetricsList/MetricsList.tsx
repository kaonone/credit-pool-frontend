import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { Metric } from 'components/Metric/Metric';
import { CashMetric } from 'components/CashMetric/CashMetric';

import { useStyles } from './MetricsList.style';

export interface IMetric {
  title: React.ReactNode;
  value: string;
  subValue?: React.ReactNode;
  isCashMetric?: boolean;
  profit?: number;
  symbol?: string;
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
      {metrics.map(({ title, value, subValue, isCashMetric, profit, symbol }, index) => (
        <React.Fragment key={index}>
          {!!index && (
            <Grid item className={classes.dividerItem}>
              <Divider orientation="vertical" className={classes.divider} />
            </Grid>
          )}
          <Grid item className={classes.metric}>
            {isCashMetric && symbol ? (
              <CashMetric title={title} value={value} profit={profit} symbol={symbol} />
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
