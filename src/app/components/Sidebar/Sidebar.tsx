import React from 'react';
import cn from 'classnames';

import { routes } from '../../routes';
import { useStyles } from './style';
import * as icons from './icons';
import * as Link from '../Link';
import * as components from './components';

const upperLinks: Link.models.Link[] = [
  {
    target: routes.account,
    label: 'Account',
    icon: icons.Account,
  },

  {
    target: routes.lend,
    label: 'Lend',
    icon: icons.Lend,
  },

  {
    target: routes.borrow,
    label: 'Borrow',
    icon: icons.Borrow,
  },

  {
    target: routes.liquidations,
    label: 'Liquidations',
    icon: icons.Liquidations,
  },

  {
    target: routes.history,
    label: 'History',
    icon: icons.History,
  },
];

const lowerLinks: Link.models.Link[] = [
  { target: routes['privacy-policy'], label: 'Privacy policy' },
  { target: routes['terms-of-service'], label: 'Terms of service' },
]

export const Sidebar: React.FC = () => {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className={cn({
      [classes.root]: true,
      [classes.rootShort]: !isExpanded,
    })}>
      <div>
        {upperLinks.map(makeLinkRenderer(isExpanded,))}
        {isExpanded && <LowerLinks />}
      </div>
      <div
        className={cn({
          [classes.switch]: true,
          [classes.switchInverted]: !isExpanded,
        })}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <icons.Switch />
      </div>
    </div>
  );
};

const LowerLinks: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.lowerLinks}>
      {lowerLinks.map(makeLinkRenderer(true))}
    </div>
  );
};

function makeLinkRenderer(shouldRenderLabel: boolean) {
  return (link: Link.models.Link) => {
    return (
      <components.Link
        key={link.label}
        link={link}
        shouldRenderLabel={shouldRenderLabel}
      />
    )
  };
}
