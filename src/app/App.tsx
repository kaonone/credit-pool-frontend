import * as React from 'react';
import { Switch, Route } from 'react-router';

import { CreditPool } from 'app/pages/CreditPool/CreditPool';

import { MainLayout, Content } from './components';

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={CreditPool} />
      <Route path="*">
        <MainLayout Content={Content} />
      </Route>
    </Switch>
  );
}
