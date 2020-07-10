import React from 'react';

import * as Link from '../../Link';
import { routes } from '../../../routes';
import { useStyles } from './Links.style';

type RouteNode = {
  getRoutePath(): string;
}

type Link = {
  target: RouteNode | string;
  label: string;
}

const links: Link[] = [
  { target: routes.stats, label: 'Statistics' },
  { target: routes.governance, label: 'Governance' },
  { target: 'wiki.akropolis.io/spartafaq/', label: 'Wiki' },
]

export const Links = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {links.map(renderLink)}
    </div>
  );
}

function renderLink(link: Link.models.Link) {
  const classes = useStyles();

  return (
    <div className={classes.link}>
      <Link.Link link={link} shouldRenderLabel />
    </div>
  )
}
