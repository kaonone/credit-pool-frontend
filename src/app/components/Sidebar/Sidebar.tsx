import React from 'react';
import cn from 'classnames';

import { routes } from '../../routes';
import * as Link from '../Link';
import { useStyles } from './Sidebar.style';
import * as icons from './icons';
import * as components from './components';
import { SidebarIconProps } from './icons/models';

const upperLinks: Link.models.Link[] = [
  {
    kind: 'internal',
    ref: routes.account.getRoutePath(),
    label: 'Account',
    renderIcon: makeIconRenderer(icons.Account),
  },

  {
    kind: 'internal',
    ref: routes.lend.getRoutePath(),
    label: 'Lend',
    renderIcon: makeIconRenderer(icons.Lend),
  },

  {
    kind: 'internal',
    ref: routes.borrow.getRoutePath(),
    label: 'Borrow',
    renderIcon: makeIconRenderer(icons.Borrow),
  },

  {
    kind: 'internal',
    ref: routes.liquidations.getRoutePath(),
    label: 'Liquidations',
    renderIcon: makeIconRenderer(icons.Liquidations),
  },

  {
    kind: 'internal',
    ref: routes.history.getRoutePath(),
    label: 'History',
    renderIcon: makeIconRenderer(icons.History),
  },
];

const lowerLinks: Link.models.Link[] = [
  {
    kind: 'internal',
    label: 'Privacy policy',
    ref: routes['privacy-policy'].getRoutePath(),
  },
  {
    kind: 'internal',
    ref: routes['terms-of-service'].getRoutePath(),
    label: 'Terms of service',
  },
];

export const Sidebar: React.FC = () => {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div
      className={cn({
        [classes.root]: true,
        [classes.rootShort]: !isExpanded,
      })}
    >
      <div className={classes.upperPart}>
        <nav className={classes.upperLinks}>{upperLinks.map(makeLinkRenderer(isExpanded))}</nav>
      </div>
      <div className={classes.lowerPart}>
        {isExpanded && <LowerLinks />}
        {renderSwitch()}
      </div>
    </div>
  );

  function renderSwitch() {
    return (
      <button
        type="button"
        className={cn({
          [classes.switch]: true,
          [classes.switchInverted]: !isExpanded,
        })}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <icons.Switch />
      </button>
    );
  }
};

const LowerLinks: React.FC = () => {
  const classes = useStyles();

  return <nav className={classes.lowerLinks}>{lowerLinks.map(makeLinkRenderer(true))}</nav>;
};

function makeLinkRenderer(shouldRenderLabel: boolean) {
  return (link: Link.models.Link) => {
    return <components.Link key={link.label} link={link} shouldRenderLabel={shouldRenderLabel} />;
  };
}

function makeIconRenderer(Icon: React.ComponentType<SidebarIconProps>) {
  return (isActive: boolean) => <Icon fontSize="inherit" withGradient={isActive} />;
}
