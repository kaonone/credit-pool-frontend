import * as React from 'react';
import { Switch, Route } from 'react-router';

import * as pages from './pages';
import * as components from './components';

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={pages.CreditPool} />
      <components.MainLayout
        Content={components.Content}
      />
    </Switch>
  );
}
