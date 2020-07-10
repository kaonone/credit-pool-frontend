import React from 'react';

import { Sidebar } from '../Sidebar';
import { NewHeader } from '../NewHeader';
import { useStyles } from './MainLayout.style';

type Props = {
  Content: React.FC;
};

export const MainLayout: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.headerAndContent}>
        <div className={classes.header}>
          <NewHeader />
        </div>
        <div className={classes.content}>
          <props.Content />
        </div>
      </div>
    </div>
  );
};
