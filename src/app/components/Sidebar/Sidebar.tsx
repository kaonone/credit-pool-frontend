import React from 'react';
import cn from 'classnames';

import { PRIVACY_POLICY_URL, T_AND_C_URL } from 'docs';

import { routes } from '../../routes';
import { useStyles } from './Sidebar.style';
import * as icons from './icons';
import * as Link from '../Link';
import * as components from './components';

const upperLinks: Link.models.Link[] = [
  {
    kind: 'internal',
    ref: routes.account.getRoutePath(),
    label: 'Account',
    icon: icons.Account,
  },

  {
    kind: 'internal',
    ref: routes.lend.getRoutePath(),
    label: 'Lend',
    icon: icons.Lend,
  },

  {
    kind: 'internal',
    ref: routes.borrow.getRoutePath(),
    label: 'Borrow',
    icon: icons.Borrow,
  },

  {
    kind: 'internal',
    ref: routes.liquidations.getRoutePath(),
    label: 'Liquidations',
    icon: icons.Liquidations,
  },

  {
    kind: 'internal',
    ref: routes.history.getRoutePath(),
    label: 'History',
    icon: icons.History,
  },
];

const lowerLinks: Link.models.Link[] = [
  {
    kind: 'external',
    label: 'Privacy policy',
    ref: PRIVACY_POLICY_URL,
  },
  {
    kind: 'external',
    label: 'Terms of service',
    ref: T_AND_C_URL,
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
