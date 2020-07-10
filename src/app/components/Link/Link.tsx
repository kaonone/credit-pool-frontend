import React from 'react';
import { NavLink } from 'react-router-dom';

import { useStyles } from './style';
import * as models from './models';

type Props = {
  shouldRenderLabel: boolean;
  link: models.Link;
};

export const Link: React.FC<Props> = props => {
  const { link, shouldRenderLabel } = props;

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

    const { label, target } = x;

    return (
      <a className={classes.root} href={target}>
        <div className={classes.label}>{label}</div>
      </a>
    );
  }

  function renderInternalLink(x: models.InternalLink) {
    const classes = useStyles();

    const { label, target, icon } = x;

    return (
      <NavLink
        key={label}
        to={target}
        className={classes.root}
        activeClassName={classes.active}
        exact
      >
        {icon && (
          <div className={classes.icon}>
            <div className={classes.activeIcon}>
              <icon.Active />
            </div>
            <div className={classes.inactiveIcon}>
              <icon.Inactive />
            </div>
          </div>
        )}
        {shouldRenderLabel && <div className={classes.label}>{label}</div>}
      </NavLink>
    );
  }
};
