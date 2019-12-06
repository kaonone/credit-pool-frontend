import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { DemoPage } from './pages/Demo/DemoPage';
import { OverviewPage } from './pages/Overview/OverviewPage';
import { ActivitiesPage } from './pages/Activities/ActivitiesPage';
import { LoansPage } from './pages/Loans/LoansPage';
import { KeepersPage } from './pages/Keepers/KeepersPage';
import { routes } from './routes';
import { BaseLayout } from './components/BaseLayout/BaseLayout';

const tKeys = tKeysAll.app;

export function App() {
  const { t } = useTranslate();

  return (
    <BaseLayout title={t(tKeys.mainTitle.getKey())}>
      <Switch>
        {process.env.NODE_ENV !== 'production' && (
          <Route exact path={routes.demo.getRoutePath()} component={DemoPage} />
        )}
        <Route exact path={routes.overview.getRoutePath()} component={OverviewPage} />
        <Route exact path={routes.activities.getRoutePath()} component={ActivitiesPage} />
        <Route exact path={routes.loans.getRoutePath()} component={LoansPage} />
        <Route exact path={routes.keepers.getRoutePath()} component={KeepersPage} />
        <Redirect to={routes.overview.getRedirectPath()} />
      </Switch>
    </BaseLayout>
  );
}
