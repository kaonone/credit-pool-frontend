import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { Back } from 'components/icons';
import { Grid, IconButton, Typography, Box, MetricsList, IMetric } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { useStyles } from './Header.style';

interface IOwnProps {
  backRoutePath?: string;
  title: React.ReactNode;
  additionalContent?: React.ReactNode;
}

type IProps = IOwnProps & RouteComponentProps;

function HeaderComponent(props: IProps) {
  const { title, backRoutePath, additionalContent } = props;
  const classes = useStyles();
  const { t } = useTranslate();
  const tKeys = tKeysAll.app.components.header;

  const metrics: IMetric[] = React.useMemo(
    () => [
      {
        title: t(tKeys.balance.getKey()),
        value: '$2192',
        profit: '12.81%',
      },
      {
        title: t(tKeys.issued.getKey()),
        value: '1895.2',
      },
      {
        title: t(tKeys.price.getKey()),
        value: '$12.15',
        profit: '12.81%',
      },
    ],
    [t],
  );

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" spacing={2}>
        {backRoutePath && (
          <Grid item>
            <IconButton component={Link} to={backRoutePath} className={classes.backButton}>
              <Back />
            </IconButton>
          </Grid>
        )}
        <Grid item xs zeroMinWidth>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h4" noWrap className={classes.title}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.icon} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.dropdown} />
        </Grid>
        {!!additionalContent && (
          <Grid item xs={12}>
            {additionalContent}
          </Grid>
        )}
      </Grid>
      <Box mt={4}>
        <Grid container alignItems="center" justify="space-between" spacing={2}>
          <Grid item>
            <MetricsList metrics={metrics} />
          </Grid>
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <div className={classes.button} />
              </Grid>
              <Grid item>
                <div className={classes.button} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export const Header = withRouter(HeaderComponent);
