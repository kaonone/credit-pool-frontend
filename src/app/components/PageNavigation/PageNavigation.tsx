import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { Tabs, Tab } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { useStyles } from './PageNavigation.style';

function PageNavigation() {
  const classes = useStyles();
  const match = useRouteMatch<{ page: string }>('/:page');

  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);

  return (
    <Tabs
      value={match && match.params.page}
      indicatorColor="primary"
      textColor="primary"
      classes={{ flexContainer: classes.tabsFlexContainer }}
    >
      {account && (
        <Tab
          className={classes.tab}
          label="Account"
          component={Link}
          value={routes.account.getElementKey()}
          to={routes.account.getRedirectPath()}
        />
      )}
      <Tab
        className={classes.tab}
        label="Pool"
        component={Link}
        value={routes.pool.getElementKey()}
        to={routes.pool.getRedirectPath()}
      />
      <Tab
        className={classes.tab}
        label="Stats"
        component={Link}
        value={routes.stats.getElementKey()}
        to={routes.stats.getRedirectPath()}
      />
      <Tab
        className={classes.tab}
        label="Distributions"
        component={Link}
        value={routes.distributions.getElementKey()}
        to={routes.distributions.getRedirectPath()}
      />
    </Tabs>
  );
}

export { PageNavigation };
