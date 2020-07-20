import * as React from 'react';

import { makeStyles } from 'utils/styles';

export function Profit() {
  const classes = useStyles();

  return <div className={classes.root}>TEST</div>;
}

const useStyles = makeStyles(
  () => ({
    root: {},
  }),
  { name: 'MySummary' },
);
