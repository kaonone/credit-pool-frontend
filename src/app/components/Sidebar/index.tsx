import React from 'react';
import { NavLink } from 'react-router-dom'

import { routes } from '../../routes';
import { useStyles } from './style';

// TODO fix build-route-tree
export type RouteNode = {
  getRoutePath(): string;
}

type Link = {
  label: string;
  target: RouteNode | string;
}

export const upperLinks: Link[] = [
  { target: routes.account, label: 'Account' },
  { target: routes.buy, label: 'Buy' },
  { target: routes.sell, label: 'Sell' },
  { target: routes.history, label: 'History' },
  { target: routes.bounty, label: 'Bounty' },
  { target: routes.liquidation, label: 'Liquidation' },
];

export const lowerLinks: Link[] = [
  { target: routes.pool, label: 'Pool' },
  { target: routes.stats, label: 'Stats' },
  { target: 'https://wiki.akropolis.io/spartafaq/', label: 'Wiki' },
]


export const Sidebar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {upperLinks.map(renderLink)}
      <div className={classes.separator} />
      {lowerLinks.map(renderLink)}
    </div>
  );
};

function renderLink({ label, target }: Link) {
  const classes = useStyles();

  return typeof target == 'string'
    ? (
      <a className={classes.link} href={target}>
        {label}
      </a>
    )

    : (
      <NavLink
        to={target.getRoutePath()}
        className={classes.link}
        activeClassName={classes.linkActive}
      >
        {label}
      </NavLink>
    );
}
