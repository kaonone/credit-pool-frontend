import React from 'react';
import cn from 'classnames';

import { routes } from '../../routes';
import { useStyles } from './style';
import * as icons from './icons';
import { Link } from './models';
import * as components from './components';

export const upperLinks: Link[] = [
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

export const lowerLinks: Link[] = [
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
  return (link: Link) => {
    return (
      <components.Link
        key={link.label}
        link={link}
        shouldRenderLabel={shouldRenderLabel}
      />
    )
  };
}
