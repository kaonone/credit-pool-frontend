import React from 'react';
import { NavLink } from 'react-router-dom'

import { routes } from '../../routes';
import { useStyles } from './style';
import * as icons from './icons';

// TODO fix build-route-tree
export type RouteNode = {
  getRoutePath(): string;
}

type Entry = {
  Icon?: icons.models.SidebarIcon;
  label: string;
  target: RouteNode | string;
}

export const upperEntries: Entry[] = [
  {
    target: routes.account,
    label: 'Account',
    Icon: icons.Account,
  },

  {
    target: "/",
    label: 'Lend',
    Icon: icons.Lend,
  },

  {
    target: routes.borrow,
    label: 'Borrow',
    Icon: icons.Borrow,
  },

  {
    target: routes.liquidations,
    label: 'Liquidations',
    Icon: icons.Liquidations,
  },

  {
    target: routes.history,
    label: 'History',
    Icon: icons.History,
  },
];

export const lowerEntries: Entry[] = [
  { target: routes['privacy-policy'], label: 'Privacy policy' },
  { target: routes['terms-of-service'], label: 'Terms of service' },
]


export const Sidebar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.links}>
        {upperEntries.map(renderLink)}
        <div className={classes.lowerLinks}>
          {lowerEntries.map(renderLink)}
        </div>
      </div>
      <div className={classes.switch}>
        <icons.Switch />
      </div>
    </div>
  );
};

function renderLink({ label, target, Icon }: Entry) {
  const classes = useStyles();

  const to = typeof target === 'string'
    ? target
    : target.getRoutePath();

  return (
    <NavLink
      key={label}
      to={to}
      className={classes.link}
      activeClassName={classes.linkActive}
      exact
    >
      {Icon && (
        <div className={classes.linkIcon}>
          <div className={classes.activeLinkIcon}>
            <Icon.active />
          </div>
          <div className={classes.inactiveLinkIcon}>
            <Icon.inactive />
          </div>
        </div>
      )}
      <div className={classes.linkLabel}>
        {label}
      </div>
    </NavLink >
  );
}
