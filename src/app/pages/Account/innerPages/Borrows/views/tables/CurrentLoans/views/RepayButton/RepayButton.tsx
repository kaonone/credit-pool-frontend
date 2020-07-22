import React from 'react';

import { Button } from 'components';

import { useStyles } from './RepayButton.style';

export const RepayButton: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained">Repay</Button>
    </div>
  );
};
