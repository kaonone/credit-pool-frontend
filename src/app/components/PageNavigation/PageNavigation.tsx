import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { Tabs, Tab } from 'components';

import { useStyles } from './PageNavigation.style';

function PageNavigation() {
  const classes = useStyles();

  return (
    <Route path="/:page">
      {({ match }: RouteComponentProps<{ page: string }>) => (
        <Tabs
          value={match && match.params.page}
          indicatorColor="primary"
          textColor="primary"
          classes={{ flexContainer: classes.tabsFlexContainer }}
        >
          <Tab
            className={classes.tab}
            label="Pool Overview"
            component={Link}
            value={routes.overview.getElementKey()}
            to={routes.overview.getRedirectPath()}
          />
          <Tab
            className={classes.tab}
            label="Proposals"
            component={Link}
            value={routes.proposals.getElementKey()}
            to={routes.proposals.getRedirectPath()}
          />
          <Tab
            className={classes.tab}
            label="My loans"
            component={Link}
            value={routes['my-loans'].getElementKey()}
            to={routes['my-loans'].getRedirectPath()}
          />
          <Tab
            className={classes.tab}
            label="My guarantees"
            component={Link}
            value={routes['my-guarantees'].getElementKey()}
            to={routes['my-guarantees'].getRedirectPath()}
          />
          <Tab
            className={classes.tab}
            label="Liquidations"
            component={Link}
            value={routes.liquidations.getElementKey()}
            to={routes.liquidations.getRedirectPath()}
          />
        </Tabs>
      )}
    </Route>
  );
}

export { PageNavigation };
