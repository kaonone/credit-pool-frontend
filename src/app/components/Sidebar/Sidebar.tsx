import React from 'react';
import cn from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';

import { tKeys } from 'services/i18n';
import { IconButton } from 'components';
import * as icons from 'components/icons/navigation';

import { routes } from '../../routes';
import * as Link from '../Link';
import { useStyles } from './Sidebar.style';
import * as components from './components';

const upperLinks: Link.models.Link[] = [
  {
    kind: 'internal',
    ref: routes.account.getRoutePath(),
    label: tKeys.modules.navigation.account.getKey(),
    renderIcon: makeIconRenderer(icons.Account),
  },

  {
    kind: 'internal',
    ref: routes.lend.getRoutePath(),
    label: tKeys.modules.navigation.lend.getKey(),
    renderIcon: makeIconRenderer(icons.Lend),
  },

  {
    kind: 'internal',
    ref: routes.borrow.getRoutePath(),
    label: tKeys.modules.navigation.borrow.getKey(),
    renderIcon: makeIconRenderer(icons.Borrow),
  },

  {
    kind: 'internal',
    ref: routes.liquidations.getRoutePath(),
    label: tKeys.modules.navigation.liquidations.getKey(),
    renderIcon: makeIconRenderer(icons.Liquidations),
  },

  {
    kind: 'internal',
    ref: routes.history.getRoutePath(),
    label: tKeys.modules.navigation.history.getKey(),
    renderIcon: makeIconRenderer(icons.History),
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
        <icons.Switch fontSize="inherit" />
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
  return (isActive: boolean) => (
    <Icon fontSize="inherit" {...(!isActive && { color: 'inherit' })} />
  );
}
