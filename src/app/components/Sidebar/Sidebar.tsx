import React from 'react';
import cn from 'classnames';

import { routes } from '../../routes';
import { useStyles } from './style';
import * as icons from './icons';
import * as Link from '../Link';
import * as components from './components';

const upperLinks: Link.models.Link[] = [
  {
    kind: 'internal',
    target: routes.account.getRoutePath(),
    label: 'Account',
    icon: icons.Account,
  },

  {
    kind: 'internal',
    target: routes.lend.getRoutePath(),
    label: 'Lend',
    icon: icons.Lend,
  },

  {
    kind: 'internal',
    target: routes.borrow.getRoutePath(),
    label: 'Borrow',
    icon: icons.Borrow,
  },

  {
    kind: 'internal',
    target: routes.liquidations.getRoutePath(),
    label: 'Liquidations',
    icon: icons.Liquidations,
  },

  {
    kind: 'internal',
    target: routes.history.getRoutePath(),
    label: 'History',
    icon: icons.History,
  },
];

const lowerLinks: Link.models.Link[] = [
  {
    kind: 'internal',
    label: 'Privacy policy',
    target: routes['privacy-policy'].getRoutePath(),
  },
  {
    kind: 'internal',
    target: routes['terms-of-service'].getRoutePath(),
    label: 'Terms of service'
  },
]

export const Sidebar: React.FC = () => {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className={cn({
      [classes.root]: true,
      [classes.rootShort]: !isExpanded,
    })}>
      <div className={classes.upperPart}>
        <nav className={classes.upperLinks}>
          {upperLinks.map(makeLinkRenderer(isExpanded))}
        </nav>
      </div>
      <div className={classes.lowerPart}>
        {isExpanded && <LowerLinks />}
        {renderSwitch()}
      </div>
    </div>
  );

  function renderSwitch() {
    return (
      <div
        className={cn({
          [classes.switch]: true,
          [classes.switchInverted]: !isExpanded,
        })}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <icons.Switch />
      </div>
    )
  }
};

const LowerLinks: React.FC = () => {
  const classes = useStyles();

  return (
    <nav className={classes.lowerLinks}>
      {lowerLinks.map(makeLinkRenderer(true))}
    </nav>
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
