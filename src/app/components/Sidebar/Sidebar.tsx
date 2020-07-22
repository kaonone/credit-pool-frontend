import React from 'react';
import cn from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';
import { empty } from 'rxjs';

import { useSubscribable, useOnChangeState } from 'utils/react';
import { useApi } from 'services/api';
import { tKeys } from 'services/i18n';
import { IconButton } from 'components';
import * as icons from 'components/icons/navigation';

import { routes } from '../../routes';
import * as Link from '../Link';
import { useStyles } from './Sidebar.style';
import * as components from './components';
import { sidebarStorage } from './sidebarStorage';

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

const requeredLinks = [
  tKeys.modules.navigation.account.getKey(),
  tKeys.modules.navigation.lend.getKey(),
  tKeys.modules.navigation.borrow.getKey(),
];

export const Sidebar: React.FC = () => {
  const classes = useStyles();

  const [isExpanded, setCloseSidebar] = React.useState(() => sidebarStorage.getItem('isExpanded'));
  const [links, setLinks] = React.useState(upperLinks);

  const handleExpanded = () => {
    sidebarStorage.setItem('isExpanded', !isExpanded);
    setCloseSidebar(!isExpanded);
  };

  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, [], null);

  const [distributionBalance] = useSubscribable(
    () => (account ? api.pToken.getDistributionBalanceOf$(account) : empty()),
    [api, account],
  );

  useOnChangeState(
    { distributionBalance },
    (prev, cur) => !prev.distributionBalance && cur.distributionBalance?.isZero() !== undefined,
    () =>
      setLinks(
        distributionBalance?.isZero()
          ? upperLinks.filter(link => requeredLinks.find(reqLink => reqLink === link.label))
          : upperLinks,
      ),
  );

  return (
    <div
      className={cn({
        [classes.root]: true,
        [classes.rootShort]: !isExpanded,
      })}
    >
      <div className={classes.upperPart}>
        <nav className={classes.upperLinks}>{links.map(makeLinkRenderer())}</nav>
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
        onClick={handleExpanded}
      >
        <icons.Switch fontSize="inherit" />
      </IconButton>
    );
  }
};

function makeLinkRenderer() {
  return (link: Link.models.Link) => {
    return <components.Link key={link.label} link={link} />;
  };
}

function makeIconRenderer(Icon: typeof SvgIcon) {
  return (isActive: boolean) => (
    <Icon fontSize="inherit" {...(!isActive && { color: 'inherit' })} />
  );
}
