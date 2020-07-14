import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { TabsList, TabContext, Tab, TabPanel } from 'components';

import { MySummary } from './InnerPages/MySummary/MySummary';

export function AccountPage() {
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
        <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
          <Tab
            label="My Summary"
            className={classes.tab}
            component={Link}
            value={routes.account.summary.getElementKey()}
            to={routes.account.summary.getRedirectPath()}
          />
          <Tab
            label="My Stakes"
            className={classes.tab}
            component={Link}
            value={routes.account.stakes.getElementKey()}
            to={routes.account.stakes.getRedirectPath()}
          />
          <Tab
            label="My Borrows"
            className={classes.tab}
            component={Link}
            value={routes.account.borrows.getElementKey()}
            to={routes.account.borrows.getRedirectPath()}
          />
        </TabsList>
        <TabPanel value={routes.account.summary.getElementKey()}>
          <MySummary />
        </TabPanel>
        <TabPanel value={routes.account.stakes.getElementKey()}>
          {makeUnimplementedComponent('Stakes')}
        </TabPanel>
        <TabPanel value={routes.account.summary.getElementKey()}>
          {makeUnimplementedComponent('Borrows')}
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
      borderRadius: 6,
    },
    tabs: {
      marginBottom: 40,
    },
    tab: {
      minWidth: 112,
    },
  }),
  { name: 'AccountPage' },
);

function makeUnimplementedComponent(componentLabel: string) {
  return () => <div style={{ fontSize: 45 }}>{`${componentLabel} not implemented`}</div>;
}
