import React from 'react';

import { Button } from 'components';

import { useStyles } from './Buttons.style';

export const Buttons: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="outlined">Cancel</Button>
      <div className={classes.activateButton}>
        <Button variant="contained">Activate</Button>
      </div>
    </div>
  );
};
