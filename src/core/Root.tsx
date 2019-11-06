import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Web3 from 'web3';

import { App } from 'app/App';
import { Api, ApiContext } from 'services/api';
import { ApolloProvider } from 'services/apollo';
import { I18nProvider } from 'services/i18n';
import { TransactionsNotifications } from 'features/transactionsNotifications';
import { ErrorBoundary, Snackbar } from 'components';
import { theme } from 'utils/styles';

export function Root(): React.ReactElement<{}> {
  // Detect if Web3 is found, if not, ask the user to install Metamask
  if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider);
    const api = new Api(web3);

    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Snackbar>
            <I18nProvider>
              <MuiThemeProvider theme={theme}>
                <ApiContext.Provider value={api}>
                  <ApolloProvider>
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
  return <div>You need to install Metamask</div>;
}
