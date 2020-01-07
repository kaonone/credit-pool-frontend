import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { Back, InfoIcon } from 'components/icons';
import { Grid, IconButton, Typography, MetricsList, IMetric, Tooltip } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { PTokenBuyingButton, PTokenSellingButton } from 'features/cashExchange';
import { AuthButton } from 'features/auth';

import { useStyles } from './Header.style';

interface IOwnProps {
  backRoutePath?: string;
  title: React.ReactNode;
}

type IProps = IOwnProps & RouteComponentProps;

const tKeys = tKeysAll.app.components.header;

function HeaderComponent(props: IProps) {
  const { title, backRoutePath } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  const metrics: IMetric[] = React.useMemo(
    () => [
      {
        title: t(tKeys.total.getKey()),
        value: '2192000000000000000',
        isCashMetric: true,
        profit: 12.81,
        token: 'dai',
      },
      {
        title: t(tKeys.availableBalance.getKey()),
        value: '1895200000000000000',
        isCashMetric: true,
        profit: 12.81,
        token: 'dai',
      },
      {
        title: t(tKeys.issued.getKey()),
        value: '12150000000000000',
        isCashMetric: true,
        profit: 12.81,
        token: 'dai',
      },
    ],
    [t],
  );

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" spacing={3}>
        {backRoutePath && (
          <Grid item>
            <IconButton component={Link} to={backRoutePath} className={classes.backButton}>
              <Back />
            </IconButton>
          </Grid>
        )}

        <Grid item xs zeroMinWidth>
          <Typography variant="h4" noWrap className={classes.title}>
            {title}{' '}
            <Tooltip
              title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, nobis!"
              placement="right"
            >
              <span>
                <InfoIcon className={classes.infoIcon} />
              </span>
            </Tooltip>
          </Typography>
        </Grid>

        <Grid item>
          <AuthButton color="secondary" />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="center" justify="space-between" spacing={2}>
            <Grid item>
              <MetricsList metrics={metrics} />
            </Grid>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <PTokenSellingButton size="large" color="secondary" variant="contained" />
                </Grid>
                <Grid item>
                  <PTokenBuyingButton size="large" color="secondary" variant="contained" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export const Header = withRouter(HeaderComponent);
