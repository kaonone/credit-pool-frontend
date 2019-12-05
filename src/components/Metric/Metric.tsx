import * as React from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { Profit } from 'components/Profit/Profit';

import { useStyles } from './Metric.style';

export interface IProps {
  title: string;
  value: React.ReactNode;
  profit?: React.ReactNode;
  theme?: 'light' | 'dark';
}

function Metric(props: IProps) {
  const { title, value, profit, theme } = props;
  const classes = useStyles();

  return (
    <div className={cn(classes.root, (theme && classes[theme]) || classes.dark)}>
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
