import React from 'react';
import { NavLink } from 'react-router-dom'

import { useStyles } from './style';
import * as models from './models';

type Props = {
  shouldRenderLabel: boolean;
  link: models.Link;
}

export const Link: React.FC<Props> = props => {
  const { link, shouldRenderLabel } = props;

  switch (link.kind) {
    case 'internal':
      return renderInternalLink(link);
    case 'external':
      return renderExternalLink(link);
  }

  function renderExternalLink(link: models.ExternalLink) {
    const classes = useStyles();

    const { label, target } = link;
    return (
      <a
        className={classes.root}
        href={target}
      >
        <div className={classes.label}>
          {label}
        </div>
      </a>
    )
  }

  function renderInternalLink(link: models.InternalLink) {
    const classes = useStyles();

    const { label, target, icon } = link;

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
        {shouldRenderLabel && (
          <div className={classes.label}>
            {label}
          </div>
        )}
      </NavLink >
    );
  }
};
