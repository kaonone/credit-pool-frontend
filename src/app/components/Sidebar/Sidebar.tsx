import React from 'react';
import cn from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';

import { tKeys } from 'services/i18n';
import { IconButton } from 'components';
import { Account, Borrow, History, Lend, Liquidations, Switch } from 'components/icons';

import { routes } from '../../routes';
import * as Link from '../Link';
import { useStyles } from './Sidebar.style';
import * as components from './components';

const upperLinks: Link.models.Link[] = [
  {
    kind: 'internal',
    ref: routes.account.getRoutePath(),
    label: tKeys.modules.navigation.account.getKey(),
    renderIcon: makeIconRenderer(Account),
  },

  {
    kind: 'internal',
    ref: routes.lend.getRoutePath(),
    label: tKeys.modules.navigation.lend.getKey(),
    renderIcon: makeIconRenderer(Lend),
  },

  {
    kind: 'internal',
    ref: routes.borrow.getRoutePath(),
    label: tKeys.modules.navigation.borrow.getKey(),
    renderIcon: makeIconRenderer(Borrow),
  },

  {
    kind: 'internal',
    ref: routes.liquidations.getRoutePath(),
    label: tKeys.modules.navigation.liquidations.getKey(),
    renderIcon: makeIconRenderer(Liquidations),
  },

  {
    kind: 'internal',
    ref: routes.history.getRoutePath(),
    label: tKeys.modules.navigation.history.getKey(),
    renderIcon: makeIconRenderer(History),
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
        <div className={classes.lowerPart}>{renderSwitch()}</div>
      </div>
    </div>
  );

  function renderSwitch() {
    return (
      <IconButton
        className={cn(classes.switch, {
          [classes.switchInverted]: !isExpanded,
        })}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Switch fontSize="inherit" />
      </IconButton>
    );
  }
};

function makeLinkRenderer(shouldRenderLabel: boolean) {
  return (link: Link.models.Link) => {
    return <components.Link key={link.label} link={link} shouldRenderLabel={shouldRenderLabel} />;
  };
}

function makeIconRenderer(Icon: typeof SvgIcon) {
  return (isActive: boolean) => <Icon fontSize="inherit" {...(!isActive && { color: 'inherit' })} />;
}
