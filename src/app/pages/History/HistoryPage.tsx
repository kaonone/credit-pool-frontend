import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { TabsList, TabContext, Tab, TabPanel } from 'components';
import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';

import { ComingSoonPage } from '../ComingSoon/ComingSoon';

export function HistoryPage() {
  const match = useRouteMatch<{ page: string }>('/history/:page');
  const [selectedPage, setSelectedPage] = React.useState(
    routes.history.transaction.getElementKey(),
  );

  const page = match ? match.params.page : routes.history.transaction.getElementKey();

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: string) => {
    setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <TabContext value={selectedPage}>
        <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
          <Tab
            label="Transaction History"
            component={Link}
            value={routes.history.transaction.getElementKey()}
            to={routes.history.transaction.getRedirectPath()}
          />
          <Tab
            label="LPs Profit"
            component={Link}
            value={routes.history.profit.getElementKey()}
            to={routes.history.profit.getRedirectPath()}
          />
          <Tab
            label="Liquidations"
            component={Link}
            value={routes.history.liquidations.getElementKey()}
            to={routes.history.liquidations.getRedirectPath()}
          />
        </TabsList>
        <TabPanel value={routes.history.transaction.getElementKey()}>
          <ComingSoonPage />
        </TabPanel>
        <TabPanel value={routes.history.profit.getElementKey()}>
          <ComingSoonPage />
        </TabPanel>
        <TabPanel value={routes.history.liquidations.getElementKey()}>
          <ComingSoonPage />
        </TabPanel>
      </TabContext>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      backgroundColor: '#13131b',
      padding: '50px 60px',
    },
    tabs: {
      marginBottom: 40,
    },
  }),
  { name: 'HistoryPage' },
);
