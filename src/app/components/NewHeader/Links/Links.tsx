import React from 'react';

import { tKeys } from 'services/i18n';

import * as Link from '../../Link';
import { routes } from '../../../routes';
import { useStyles } from './Links.style';

const links: Link.models.Link[] = [
  {
    kind: 'internal',
    label: tKeys.modules.navigation.statistics.getKey(),
    ref: routes.stats.getRoutePath(),
  },
  {
    kind: 'internal',
    label: tKeys.modules.navigation.governance.getKey(),
    ref: routes.governance.getRoutePath(),
  },
  {
    kind: 'external',
    ref: 'https://wiki.akropolis.io/spartafaq/',
    label: tKeys.modules.navigation.wiki.getKey(),
  },
];

export const Links = () => {
  const classes = useStyles();

  return <div className={classes.root}>{links.map(renderLink)}</div>;
};

function renderLink(link: Link.models.Link) {
  const classes = useStyles();

  return (
    <div className={classes.link} key={link.label}>
      <Link.Link link={link} shouldRenderLabel />
    </div>
  );
}
