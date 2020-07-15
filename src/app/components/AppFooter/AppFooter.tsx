import React from 'react';

import { PRIVACY_POLICY_URL, T_AND_C_URL } from 'docs';
import { tKeys, useTranslate } from 'services/i18n';
import { IMenuItem } from 'utils/types/common';
import { Link, Typography } from 'components';

import { useStyles } from './AppFooter.style';

const navItems: IMenuItem[] = [
  {
    path: PRIVACY_POLICY_URL,
    title: tKeys.modules.navigation.privacyPolicy.getKey(),
  },
  {
    path: T_AND_C_URL,
    title: tKeys.modules.navigation.termsConditions.getKey(),
  },
];

interface Props {
  customNavItems?: IMenuItem[];
}

function AppFooter({ customNavItems }: Props) {
  const classes = useStyles();
  const { t } = useTranslate();

  const yearNow = new Date().getFullYear();

  return (
    <footer className={classes.root}>
      <section className={classes.copyright}>
        <Typography className={classes.text} color="textSecondary">
          {t(tKeys.modules.navigation.copyright.getKey())}
        </Typography>
        {(customNavItems || navItems).map(({ path, title }, index) => (
          <Link
            key={index}
            className={classes.text}
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            title={t(title)}
            color="textPrimary"
          >
            {t(title)}
          </Link>
        ))}
      </section>
      <Typography className={classes.text} color="textSecondary">
        {yearNow}
      </Typography>
    </footer>
  );
}

export { AppFooter };
