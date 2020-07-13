import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { routes } from 'app/routes';
import { Button, Intro, Link, LinkProps } from 'components';
import { makeStyles } from 'utils/styles';

import { CreditPoolIcon, CreditPoolTextLogo } from '../Icons';

export function CreditPoolIntro() {
  const classes = useStyles();
  return (
    <Intro
      icon={
        <>
          <CreditPoolIcon fontSize="inherit" />
          <CreditPoolTextLogo className={classes.textLogo} />
        </>
      }
      title={
        <>
          <span>Create your own community bank.</span>
          <br />
          <span>Monetise your ideas. Build your reputation on-chain.</span>
        </>
      }
      description="Access under-collateralised credit based on trust"
    >
      <div className={classes.content}>
        Try it on
        <Button<typeof RouterLink>
          className={classes.button}
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          component={RouterLink}
          to={routes.stats.getRedirectPath()}
        >
          Mainnet
        </Button>
        or
        <Button
          className={classes.button}
          fullWidth
          size="large"
          variant="outlined"
          color="primary"
          component={Link as React.FunctionComponent<Omit<LinkProps, 'variant'>>}
          underline="none"
          href="https://sparta-rinkeby.akropolis.io/stats"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rinkeby
        </Button>
      </div>
    </Intro>
  );
}

const useStyles = makeStyles(theme => ({
  textLogo: {
    fontSize: theme.spacing(2.75),
    marginLeft: theme.spacing(2.5),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',

    fontSize: theme.spacing(1.5),
    [theme.breakpoints.up('tabletXS')]: {
      fontSize: theme.spacing(2.5),
    },
  },
  button: {
    margin: theme.spacing(0, 1.25),
    [theme.breakpoints.up('tabletXS')]: {
      margin: theme.spacing(0, 2),
    },
  },
}));
