import React from 'react';
import { NavLink } from 'react-router-dom'

import { useStyles } from './style';
import * as models from './models';

type Props = {
  shouldRenderLabel: boolean;
  link: models.Link;
}

export const Link: React.FC<Props> = props => {
  const { link: { label, target, icon }, shouldRenderLabel } = props;

  const classes = useStyles();

  const to = typeof target === 'string'
    ? target
    : target.getRoutePath();

  return (
    <NavLink
      key={label}
      to={to}
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
};
