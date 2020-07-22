import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { TabsList, TabContext, Tab, TabPanel, Button } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import * as innerPages from './innerPages';

const tKeys = tKeysAll.app.pages.account;

export function AccountPage() {
  const { t } = useTranslate();
  const match = useRouteMatch<{ page: string }>('/account/:page');
  const [selectedPage, setSelectedPage] = React.useState(routes.account.summary.getElementKey());

  const page = match ? match.params.page : routes.account.summary.getElementKey();

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
        <div className={classes.navigationBar}>
          <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
            <Tab
              label={t(tKeys.tabs.summary.getKey())}
              className={classes.tab}
              component={Link}
              value={routes.account.summary.getElementKey()}
              to={routes.account.summary.getRedirectPath()}
            />
            <Tab
              label={t(tKeys.tabs.stakes.getKey())}
              className={classes.tab}
              component={Link}
              value={routes.account.stakes.getElementKey()}
              to={routes.account.stakes.getRedirectPath()}
            />
            <Tab
              label={t(tKeys.tabs.borrows.getKey())}
              className={classes.tab}
              component={Link}
              value={routes.account.borrows.getElementKey()}
              to={routes.account.borrows.getRedirectPath()}
            />
          </TabsList>
          {renderNavigationButton()}
        </div>
        <TabPanel value={routes.account.summary.getElementKey()}>
          <innerPages.MySummary />
        </TabPanel>
        <TabPanel value={routes.account.stakes.getElementKey()}>
          <innerPages.Stakes />
        </TabPanel>
        <TabPanel value={routes.account.borrows.getElementKey()}>
          <innerPages.Borrows />
        </TabPanel>
      </TabContext>
    </Grid>
  );

  function renderNavigationButton() {
    switch (selectedPage) {
      case 'stakes':
        return (
          <Button component={Link} variant="contained" to={routes.lend.getRedirectPath()}>
            Lend
          </Button>
        );

      case 'borrows':
        return (
          <Button component={Link} variant="contained" to={routes.borrow.getRedirectPath()}>
            Borrow
          </Button>
        );
    }

    return null;
  }
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: '50px 60px',
    },
    tabs: {
      marginBottom: 40,
    },
    tab: {
      minWidth: 112,
    },
    navigationBar: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
  }),
  { name: 'AccountPage' },
);
