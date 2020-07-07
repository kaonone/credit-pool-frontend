import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { routes } from '../../routes'
import * as pages from '../../pages';

export const Content: React.FC = () => {
  return (
    <Switch>
      {process.env.NODE_ENV !== 'production' && (
        <Route exact path={routes.demo.getRoutePath()} component={pages.DemoPage} />
      )}
      <Route exact path="/" component={pages.CreditPool} />
      <Route exact path={routes.account.getRoutePath()} component={pages.AccountPage} />
      <Route exact path={routes.pool.getRoutePath()} component={pages.PoolPage} />
      <Route exact path={routes.stats.getRoutePath()} component={pages.StatsPage} />
      <Route exact path={routes.distributions.getRoutePath()} component={pages.DistributionsPage} />

      <Route exact path={routes.proposals.getRoutePath()} component={pages.ActivitiesPage} />
      <Route exact path={routes.balance.getRoutePath()} component={pages.BalancesPage} />
      <Redirect to={routes.stats.getRedirectPath()} />
    </Switch>
  )
}
