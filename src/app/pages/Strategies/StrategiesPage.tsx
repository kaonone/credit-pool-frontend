import * as React from 'react';
import cn from 'classnames';

import { Grid } from 'components';
import { makeStyles } from 'utils/styles';

export function StrategiesPage() {
  //const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
      </Grid>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
      </Grid>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({}));
