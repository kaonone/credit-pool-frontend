import React from 'react';

import * as views from './views';
import { useStyles } from './Stakes.style';

export const Stakes: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <views.Metrics />
    </div>
  );
};
