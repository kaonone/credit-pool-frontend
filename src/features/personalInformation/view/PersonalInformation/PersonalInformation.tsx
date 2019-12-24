import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { GetLoanButton } from 'features/cashExchange';
import { CashMetric, ICashMetricProps } from 'components';

import { useStyles } from './PersonalInformation.style';

const tKeys = tKeysAll.features.personalInformation;

function PersonalInformation() {
  const classes = useStyles();
  const { t } = useTranslate();

  const metrics: ICashMetricProps[] = React.useMemo(
    () => [
      {
        title: t(tKeys.deposit.getKey()),
        value: '18534000000000000',
        token: 'dai',
      },
      {
        title: t(tKeys.liquid.getKey()),
        value: '18534000000000000',
        token: 'ptk',
        profit: 285.34,
      },
      {
        title: t(tKeys.staked.getKey()),
        value: '18534000000000000',
        token: 'ptk',
      },
      {
        title: t(tKeys.credit.getKey()),
        value: '280000000000000000',
        token: 'dai',
      },
    ],
    [t],
  );

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box mb={3}>
          <Typography className={classes.title} variant="subtitle2">
            {t(tKeys.title.getKey())}
          </Typography>
        </Box>
        <Grid container spacing={2} className={classes.metrics}>
          {metrics.map(({ title, value, token, profit }, index) => (
            <Grid key={index} item xs={12}>
              <CashMetric title={title} value={value} token={token} profit={profit} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <GetLoanButton />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export { PersonalInformation };
