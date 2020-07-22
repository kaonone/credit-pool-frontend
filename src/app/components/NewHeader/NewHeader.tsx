import React from 'react';
import { Link } from 'react-router-dom';

import { AuthButton } from 'features/auth';
import { ThemeButton } from 'services/theme';
import { routes } from 'app/routes';

import { useStyles } from './NewHeader.style';
import { Logo } from './icons';
import { Links } from './Links';

export const NewHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.leftPart}>
        <Link to="/">
          <Logo />
        </Link>

        <nav className={classes.links}>
          <Links />
        </nav>
      </div>
      <div className={classes.rightPart}>
        <div className={classes.authButton}>
          <AuthButton
            connectRedirectPath={routes.account.getRedirectPath()}
            disconnectRedirectPath={routes.stats.getRedirectPath()}
          />
        </div>
        <ThemeButton />
      </div>
    </header>
  );
};
