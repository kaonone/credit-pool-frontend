import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'app/App';
import { Api, ApiContext } from 'services/api';
import { ApolloProvider } from 'services/apollo';
import { I18nProvider } from 'services/i18n';
import { TransactionsNotifications } from 'features/transactionsNotifications';
import { ErrorBoundary, Snackbar, CssBaseline } from 'components';
import { theme } from 'utils/styles';

export function Root(): React.ReactElement<{}> {
  const api = new Api();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Snackbar>
          <I18nProvider>
            <MuiThemeProvider theme={theme}>
              <ApiContext.Provider value={api}>
                <ApolloProvider>
                  <CssBaseline />
                  <App />
                  <TransactionsNotifications />
                </ApolloProvider>
              </ApiContext.Provider>
            </MuiThemeProvider>
          </I18nProvider>
        </Snackbar>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
