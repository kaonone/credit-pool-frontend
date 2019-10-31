import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from 'utils/styles';

import DemoPage from './pages/Demo/DemoPage';
import HomePage from './pages/Home/HomePage';
import routes from './routes';

interface IProps {}

function App(_props: IProps) {
  return (
    <Switch>
      <MuiThemeProvider theme={theme}>
        {process.env.NODE_ENV !== 'production' && (
          <Route exact path={routes.demo.getRoutePath()} component={DemoPage} />
        )}
        <Route exact path={routes.home.getRoutePath()} component={HomePage} />
        <Redirect to={routes.home.getRedirectPath()} />
      </MuiThemeProvider>
    </Switch>
  );
}

export default App;
