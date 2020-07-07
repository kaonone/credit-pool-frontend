import React from 'react';

import { Sidebar } from '../Sidebar';
import { NewHeader } from '../NewHeader';
import { useStyles } from './style';

type Props = {
  Content: React.FC;
}

export const MainLayout: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
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
}
