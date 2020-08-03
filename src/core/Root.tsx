import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import { App } from 'app/App';
import { Api, ApiContext } from 'services/api';
import { ApolloProvider } from 'services/apollo';
import { I18nProvider } from 'services/i18n';
import { ThemeProvider } from 'services/theme';
import { TransactionsNotifications } from 'features/transactionsNotifications';
import { CookiesMsg } from 'features/cookies';
import { NetworkWarning } from 'features/networkWarning';
import { ErrorBoundary, Snackbar, CssBaseline } from 'components';
import { AdaptabilityProvider } from 'services/adaptability';

export function Root(): React.ReactElement<{}> {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ApolloProvider>
          <ApiWrapper />
        </ApolloProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

function ApiWrapper() {
  const apolloClient = useApolloClient();

  const api = new Api(apolloClient);

  if (process.env.NODE_ENV === 'development') {
    (window as any).api = api;
  }

  return (
    <ApiContext.Provider value={api}>
      <I18nProvider>
        <ThemeProvider>
          <Snackbar>
            <AdaptabilityProvider>
              <CssBaseline />
              <App />
              <TransactionsNotifications />
              <CookiesMsg />
              <NetworkWarning />
            </AdaptabilityProvider>
          </Snackbar>
        </ThemeProvider>
      </I18nProvider>
    </ApiContext.Provider>
  );
}
