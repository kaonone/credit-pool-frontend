import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { DemoPage } from './pages/Demo/DemoPage';
import { OverviewPage } from './pages/Overview/OverviewPage';
import { ActivitiesPage } from './pages/Activities/ActivitiesPage';
import { MyLoansPage } from './pages/MyLoans/MyLoans';
import { MyGuaranteesPage } from './pages/MyGuarantees/MyGuarantees';
import { LiquidationsPage } from './pages/Liquidations/Liquidations';
import { BalancesPage } from './pages/Balances/Balances';
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
        <Route exact path={routes.proposals.getRoutePath()} component={ActivitiesPage} />
        <Route exact path={routes['my-loans'].getRoutePath()} component={MyLoansPage} />
        <Route exact path={routes['my-guarantees'].getRoutePath()} component={MyGuaranteesPage} />
        <Route exact path={routes.liquidations.getRoutePath()} component={LiquidationsPage} />
        <Route exact path={routes.balance.getRoutePath()} component={BalancesPage} />
        <Redirect to={routes.overview.getRedirectPath()} />
      </Switch>
    </BaseLayout>
  );
}
