import * as React from 'react';
import { Switch, Route } from 'react-router';

import { Landing } from 'app/pages/Landing/Landing';

import { MainLayout, Content } from './components';

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="*">
        <MainLayout Content={Content} />
      </Route>
    </Switch>
  );
}
