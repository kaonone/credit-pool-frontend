import React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from 'utils/styles';

import { MySummary } from './InnerPages/MySummary/MySummary';

export function AccountPage() {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <MySummary />
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      backgroundColor: '#13131b',
      padding: '50px 60px',
    },
  }),
  { name: 'AccountPage' },
);
