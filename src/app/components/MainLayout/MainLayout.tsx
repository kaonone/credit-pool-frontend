import React from 'react';
import cn from 'classnames';

import { Sidebar } from '../Sidebar';
import { NewHeader } from '../NewHeader';
import { useStyles } from './MainLayout.style';
import { AppFooter } from '../AppFooter/AppFooter';

type Props = {
  Content: React.FC;
};

export const MainLayout: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.headerAndContent}>
        <div className={cn(classes.header, classes.paperBackground)}>
          <NewHeader />
        </div>
        <div className={cn(classes.header, classes.paperBackground)}>
          <props.Content />
        </div>
        <div className={cn(classes.header, classes.paperBackground)}>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};
