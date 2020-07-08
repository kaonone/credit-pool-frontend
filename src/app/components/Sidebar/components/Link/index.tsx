import React from 'react';
import { NavLink } from 'react-router-dom'

import { useStyles } from './style';
import { Link as LinkModel } from '../../models';

type Props = {
  shouldRenderLabel: boolean;
  link: LinkModel;
}

export const Link: React.FC<Props> = props => {
  const { link: { label, target, Icon }, shouldRenderLabel } = props;

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
      {Icon && (
        <div className={classes.icon}>
          <div className={classes.activeIcon}>
            <Icon.active />
          </div>
          <div className={classes.inactiveIcon}>
            <Icon.inactive />
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
