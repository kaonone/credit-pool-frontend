import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { DemoPage } from './pages/Demo/DemoPage';
import { StatsPage } from './pages/Stats/Stats';
import { BalancesPage } from './pages/Balances/Balances';
import { ActivitiesPage } from './pages/Activities/ActivitiesPage';
import { routes } from './routes';
import { BaseLayout } from './components/BaseLayout/BaseLayout';
import { ComingSoonPage } from './pages/ComingSoon/ComingSoon';

const tKeys = tKeysAll.app;

export function App() {
  const { t } = useTranslate();

  return (
    <BaseLayout title={t(tKeys.mainTitle.getKey())}>
      <Switch>
        {process.env.NODE_ENV !== 'production' && (
          <Route exact path={routes.demo.getRoutePath()} component={DemoPage} />
        )}
        <Route exact path={routes.account.getRoutePath()} component={ComingSoonPage} />
        <Route exact path={routes.pool.getRoutePath()} component={ComingSoonPage} />
        <Route exact path={routes.stats.getRoutePath()} component={StatsPage} />
        <Route exact path={routes.distributions.getRoutePath()} component={ComingSoonPage} />

        <Route exact path={routes.proposals.getRoutePath()} component={ActivitiesPage} />
        <Route exact path={routes.balance.getRoutePath()} component={BalancesPage} />
        <Redirect to={routes.pool.getRedirectPath()} />
      </Switch>
    </BaseLayout>
  );
}
