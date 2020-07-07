import React from 'react';

import { AuthButton } from 'features/auth';
import { ThemeButton } from 'services/theme';

import { useStyles } from './style';
import { Logo } from './icons';

export const NewHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftPart}>
        <Logo />
        <div className={classes.authButton}>
          <AuthButton />
        </div>
      </div>
      <div className={classes.rightPart}>
        <ThemeButton />
      </div>
    </div>
  );
}
