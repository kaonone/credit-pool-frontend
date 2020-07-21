import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { TabsList, TabContext, Tab, TabPanel, ComingSoon } from 'components';
import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';

import { Profit } from './InnerPages/Profit/Profit';

const tKeys = tKeysAll.app.pages.history;

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

  const { t } = useTranslate();

  return (
    <Grid className={classes.root}>
      <TabContext value={selectedPage}>
        <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
          <Tab
            label={t(tKeys.tabs.transaction.getKey())}
            component={Link}
            value={routes.history.transaction.getElementKey()}
            to={routes.history.transaction.getRedirectPath()}
          />
          <Tab
            label={t(tKeys.tabs.profit.getKey())}
            component={Link}
            value={routes.history.profit.getElementKey()}
            to={routes.history.profit.getRedirectPath()}
          />
          <Tab
            label={t(tKeys.tabs.liquidations.getKey())}
            component={Link}
            value={routes.history.liquidations.getElementKey()}
            to={routes.history.liquidations.getRedirectPath()}
          />
        </TabsList>
        <TabPanel value={routes.history.transaction.getElementKey()}>
          <ComingSoon />
        </TabPanel>
        <TabPanel value={routes.history.profit.getElementKey()}>
          <Profit />
        </TabPanel>
        <TabPanel value={routes.history.liquidations.getElementKey()}>
          <ComingSoon />
        </TabPanel>
      </TabContext>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: '50px 60px',
    },
    tabs: {
      marginBottom: 40,
    },
  }),
  { name: 'HistoryPage' },
);
