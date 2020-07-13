import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, ButtonProps } from 'components';
import { routes } from 'app/routes';

import { useStyles } from './AppButton.style';

function AppButton({ size }: Partial<Pick<ButtonProps, 'size'>>) {
  const classes = useStyles();

  return (
    <Button<typeof RouterLink>
      fullWidth
      size={size}
      variant="contained"
      color="primary"
      component={RouterLink}
      to={routes.stats.getRedirectPath()}
      className={classes.root}
    >
      App
    </Button>
  );
}

export { AppButton };
