import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { routes } from '../../routes';
import * as pages from '../../pages';

export const Content: React.FC = () => {
  return (
    <Switch>
      {process.env.NODE_ENV !== 'production' && (
        <Route exact path={routes.demo.getRoutePath()} component={pages.DemoPage} />
      )}
      <Route path={routes.account.getRoutePath()} component={pages.AccountPage} />
      <Route exact path={routes.lend.getRoutePath()} component={pages.Lend} />
      <Route
        exact
        path={routes.borrow.getRoutePath()}
        component={makeUnimplementedComponent('Borrow')}
      />
      <Route
        exact
        path={routes.liquidations.getRoutePath()}
        component={makeUnimplementedComponent('Liquidations')}
      />
      <Route path={routes.history.getRoutePath()} component={pages.HistoryPage} />
      <Route
        exact
        path={routes.governance.getRoutePath()}
        component={makeUnimplementedComponent('Governance')}
      />
      <Route exact path={routes.stats.getRoutePath()} component={pages.StatsPage} />
      <Route
        exact
        path={routes['privacy-policy'].getRoutePath()}
        component={makeUnimplementedComponent('Privacy policy')}
      />
      <Route
        exact
        path={routes['terms-of-service'].getRoutePath()}
        component={makeUnimplementedComponent('Terms of service')}
      />
      <Route exact path={routes.strategies.getRoutePath()} component={pages.StrategiesPage} />
      <Redirect to="/" />
    </Switch>
  );
};

function makeUnimplementedComponent(componentLabel: string) {
  return () => <div style={{ fontSize: 45 }}>{`${componentLabel} not implemented`}</div>;
}
