import React from 'react';

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

  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, [], null);

  return (
    <div className={classes.root}>
      {account && <Sidebar />}
      <div className={classes.headerAndContent}>
        <div className={classes.header}>
          <NewHeader />
        </div>
        <div className={classes.content}>
          <props.Content />
        </div>
        <div className={classes.footer}>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};
