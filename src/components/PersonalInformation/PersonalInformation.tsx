import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { GetLoanButton } from 'features/cashExchange';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { CashMetric } from 'components/CashMetric/CashMetric';

import { useStyles } from './PersonalInformation.style';

function PersonalInformation() {
  const classes = useStyles();
  const { t } = useTranslate();
  const tKeys = tKeysAll.components.personalInformation;

  const metrics = React.useMemo(
    () => [
      {
        title: t(tKeys.deposit.getKey()),
        value: '18534000000000000',
        symbol: 'DAI',
      },
      {
        title: t(tKeys.liquid.getKey()),
        value: '18534000000000000',
        symbol: 'PTK',
        profit: 285.34,
      },
      {
        title: t(tKeys.staked.getKey()),
        value: '18534000000000000',
        symbol: 'PTK',
      },
      {
        title: t(tKeys.credit.getKey()),
        value: '280000000000000000',
        symbol: 'DAI',
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
        <Box mb={2}>
          <Grid container spacing={2} className={classes.metrics}>
            {metrics.map(({ title, value, symbol, profit }, index) => (
              <Grid key={index} item xs={12}>
                <CashMetric title={title} value={value} symbol={symbol} profit={profit} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <GetLoanButton />
      </CardContent>
    </Card>
  );
}

export { PersonalInformation };
