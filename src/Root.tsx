import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Web3 from 'web3';

import { Api, ApiContext } from 'services/api';
import { ErrorBoundary } from 'components';
import App from './app/App';

const theme = createMuiTheme();

function Root(): React.ReactElement<{}> {
  // Detect if Web3 is found, if not, ask the user to install Metamask
  if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider);
    const api = new Api(web3);

    return (
      <ErrorBoundary>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <ApiContext.Provider value={api}>
              <App />
            </ApiContext.Provider>
          </MuiThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
  return <div>You need to install Metamask</div>;
}

export default Root;
