import React from 'react';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';

import { useTranslate } from 'services/i18n';

import { useStyles } from './style';
import * as models from './models';

type Props = {
  shouldRenderLabel: boolean;
  link: models.Link;
};

export const Link: React.FC<Props> = props => {
  const { link, shouldRenderLabel } = props;
  const { t } = useTranslate();

  switch (link.kind) {
    case 'internal':
      return renderInternalLink(link);

    case 'external':
      return renderExternalLink(link);

    default: {
      const badLink: never = link;
      console.error('bad link kind', badLink);

      return null;
    }
  }

  function renderExternalLink(x: models.ExternalLink) {
    const classes = useStyles();

    const { label, ref } = x;

    return (
      <a target="_blank" rel="noopener noreferrer" className={classes.root} href={ref}>
        <div className={classes.label}>{t(label)}</div>
      </a>
    );
  }

  function renderInternalLink(x: models.InternalLink) {
    const classes = useStyles();

    const { label, ref, renderIcon } = x;
    const isActive = !!useRouteMatch(ref);

    return (
      <NavLink key={label} to={ref} className={classes.root} activeClassName={classes.active} exact>
        {renderIcon && <div className={classes.icon}>{renderIcon(isActive)}</div>}
        {shouldRenderLabel && <div className={classes.label}>{t(label)}</div>}
      </NavLink>
    );
  }
};
