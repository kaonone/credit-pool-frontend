import React from 'react';
import { BrowserRouter } from 'react-router-dom';

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
  const api = new Api();

  if (process.env.NODE_ENV === 'development') {
    (window as any).api = api;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ApiContext.Provider value={api}>
          <I18nProvider>
            <ThemeProvider>
              <AdaptabilityProvider>
                <Snackbar>
                  <ApolloProvider>
                    <CssBaseline />
                    <App />
                    <TransactionsNotifications />
                    <CookiesMsg />
                    <NetworkWarning />
                  </ApolloProvider>
                </Snackbar>
              </AdaptabilityProvider>
            </ThemeProvider>
          </I18nProvider>
        </ApiContext.Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
