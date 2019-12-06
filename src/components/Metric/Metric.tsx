import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { Profit } from 'components/Profit/Profit';

import { useStyles } from './Metric.style';

interface IProps {
  title: string;
  value: React.ReactNode;
  profit?: React.ReactNode;
}

function Metric(props: IProps) {
  const { title, value, profit } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Typography variant="subtitle2" component="h6" className={classes.metricTitle}>
            {title}
          </Typography>
          <Typography variant="h5" component="span" className={classes.metricValue}>
            {value}
          </Typography>
        </Grid>
        {profit && (
          <Grid item>
            <Profit value={profit} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export { Metric };
