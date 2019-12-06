import React from 'react';
import Grid from '@material-ui/core/Grid';
import CallMadeIcon from '@material-ui/icons/CallMade';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './Profit.style';

interface IProps {
  value: React.ReactNode;
}

function Profit(props: IProps) {
  const { value } = props;
  const classes = useStyles();

  return (
    <Grid container alignItems="flex-end">
      <Grid item>
        <CallMadeIcon className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant="h6" component="span" className={classes.value}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
}

export { Profit };
