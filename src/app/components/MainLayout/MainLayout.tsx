import React from 'react';
import { AncestorBackgroundHackProvider, useTheme } from '@akropolis-web/styles';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { Sidebar } from '../Sidebar';
import { NewHeader } from '../NewHeader';
import { useStyles } from './MainLayout.style';
import { AppFooter } from '../AppFooter/AppFooter';

type Props = {
  Content: React.FC;
};

export const MainLayout: React.FC<Props> = props => {
  const classes = useStyles();
  const theme = useTheme();

  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account$, [], null);

  return (
    <div className={classes.root}>
      {account && <Sidebar />}
      <div className={classes.headerAndContent}>
        <AncestorBackgroundHackProvider backgroundColor={theme.palette.background.paper}>
          <div className={classes.header}>
            <NewHeader />
          </div>
        </AncestorBackgroundHackProvider>
        <AncestorBackgroundHackProvider backgroundColor={theme.palette.background.paper}>
          <div className={classes.content}>
            <props.Content />
          </div>
        </AncestorBackgroundHackProvider>
        <div className={classes.footer}>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};
