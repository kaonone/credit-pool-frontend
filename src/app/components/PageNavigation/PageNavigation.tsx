import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { Tabs, Tab } from 'components';

function PageNavigation() {
  return (
    <Route path="/:page">
      {({ match }: RouteComponentProps<{ page: string }>) => (
        <Tabs value={match && match.params.page} indicatorColor="primary" textColor="primary">
          <Tab
            label="Co-op Overview"
            component={Link}
            value={routes.overwiew.getElementKey()}
            to={routes.overwiew.getRedirectPath()}
          />
          <Tab
            label="Activities"
            component={Link}
            value={routes.activities.getElementKey()}
            to={routes.activities.getRedirectPath()}
          />
          <Tab
            label="Loans"
            component={Link}
            value={routes.loans.getElementKey()}
            to={routes.loans.getRedirectPath()}
          />
          <Tab
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
