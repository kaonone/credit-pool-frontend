import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './Metric.style';

export interface IProps {
  title: React.ReactNode;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  icon?: React.ReactNode;
}

function Metric(props: IProps) {
  const { title, value, subValue, icon } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            {icon && <Grid item>{icon}</Grid>}
            <Grid item>
              <Typography variant="subtitle2" component="h6" className={classes.metricTitle}>
                {title}
              </Typography>
            </Grid>
          </Grid>
          <div>
            <Typography variant="h5" component="span" className={classes.metricValue}>
              {value}
            </Typography>
            {subValue && (
              <Typography variant="subtitle1" component="div" className={classes.metricSubValue}>
                {subValue}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export { Metric };
