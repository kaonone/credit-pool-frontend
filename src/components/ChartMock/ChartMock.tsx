import * as React from 'react';

import { makeStyles } from 'utils/styles';

export function ChartMock() {
  const classes = useStyles();

  return <div className={classes.root} />;
}

const useStyles = makeStyles(
  () => ({
    root: {
      width: 54,
      height: 16,
      backgroundColor: 'red',
    },
  }),
  { name: 'ChartMock' },
);
