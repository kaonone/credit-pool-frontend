import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, ButtonProps } from 'components';
import { routes } from 'app/routes';
import { tKeys, useTranslate } from 'services/i18n';

import { useStyles } from './AppButton.style';

function AppButton({ size }: Partial<Pick<ButtonProps, 'size'>>) {
  const classes = useStyles();
  const { t } = useTranslate();

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
      {t(tKeys.modules.navigation.app.getKey())}
    </Button>
  );
}

export { AppButton };
