import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { TabsList, TabContext, Tab } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

const additionalRoutes = new Map([
  [
    routes.proposals.getElementKey(),
    {
      route: routes.proposals,
      label: 'Lending',
    },
  ],
]);

function PageNavigation() {
  const match = useRouteMatch<{ page: string }>('/:page');

  const [additionalPage, setAdditionalPage] = React.useState<string | null>();
  const additionalRoute = additionalPage && additionalRoutes.get(additionalPage);

  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);

  const page = match ? match.params.page : routes.stats.getElementKey();

  React.useEffect(() => {
    page && additionalRoutes.has(page) && setAdditionalPage(page);
  }, [page]);

  return (
    <TabContext value={page}>
      <TabsList value={page}>
        {[
          account && (
            <Tab
              label="Account"
              component={Link}
              value={routes.account.getElementKey()}
              to={routes.account.getRedirectPath()}
            />
          ),
          account && (
            <Tab
              label="Pool"
              component={Link}
              value={routes.pool.getElementKey()}
              to={routes.pool.getRedirectPath()}
            />
          ),
          <Tab
            label="Stats"
            component={Link}
            value={routes.stats.getElementKey()}
            to={routes.stats.getRedirectPath()}
          />,
          <Tab
            label="Distributions"
            component={Link}
            value={routes.distributions.getElementKey()}
            to={routes.distributions.getRedirectPath()}
          />,
          additionalRoute && (
            <Tab
              label={additionalRoute.label}
              component={Link}
              value={additionalRoute.route.getElementKey()}
              to={additionalRoute.route.getRedirectPath()}
            />
          ),
        ].filter(Boolean)}
      </TabsList>
    </TabContext>
  );
}

export { PageNavigation };
