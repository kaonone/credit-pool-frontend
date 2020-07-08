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
  Icon?: React.ComponentType;
  label: string;
  target: RouteNode | string;
}


export const upperEntries: Entry[] = [
  {
    target: routes.account,
    label: 'Account',
    Icon: icons.Account
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
      {upperEntries.map(renderLink)}
      <div className={classes.lowerLinks}>
        {lowerEntries.map(renderLink)}
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
      {Icon && <Icon />}
      <div className={classes.linkLabel}>
        {label}
      </div>
    </NavLink >
  );
}
