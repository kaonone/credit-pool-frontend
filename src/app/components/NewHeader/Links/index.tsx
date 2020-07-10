import React from 'react';

import * as Link from '../../Link';
import { routes } from '../../../routes';
import { useStyles } from './Links.style';

const links: Link.models.Link[] = [
  {
    kind: 'internal',
    label: 'Statistics',
    target: routes.stats.getRoutePath(),
  },
  {
    kind: 'internal',
    target: routes.governance.getRoutePath(),
    label: 'Governance',

  },
  {
    kind: 'external',
    target: 'https://wiki.akropolis.io/spartafaq/',
    label: 'Wiki',
  },
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
