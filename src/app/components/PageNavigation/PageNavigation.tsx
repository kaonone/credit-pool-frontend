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
        <Tabs value={match && match.params.page} indicatorColor="primary" textColor="primary">
          <Tab
            className={classes.tab}
            label="Co-op Overview"
            component={Link}
            value={routes.overview.getElementKey()}
            to={routes.overview.getRedirectPath()}
          />
          <Tab
            className={classes.tab}
            label="Activities"
            component={Link}
            value={routes.activities.getElementKey()}
            to={routes.activities.getRedirectPath()}
          />
          <Tab
            className={classes.tab}
            label="Loans"
            component={Link}
            value={routes.loans.getElementKey()}
            to={routes.loans.getRedirectPath()}
          />
          <Tab
            className={classes.tab}
            label="Keepers"
            component={Link}
            value={routes.keepers.getElementKey()}
            to={routes.keepers.getRedirectPath()}
          />
        </Tabs>
      )}
    </Route>
  );
}

export { PageNavigation };
