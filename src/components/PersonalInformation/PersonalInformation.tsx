import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { IProps as IMetric, Metric } from 'components/Metric/Metric';

import { useStyles } from './PersonalInformation.style';

function PersonalInformation() {
  const classes = useStyles();
  const { t } = useTranslate();
  const tKeys = tKeysAll.components.personalInformation;

  const metrics: IMetric[] = React.useMemo(
    () => [
      {
        title: t(tKeys.deposit.getKey()),
        value: '185.34 DAI',
      },
      {
        title: t(tKeys.liquid.getKey()),
        value: '185.34 PTK',
        profit: '$285.34',
      },
      {
        title: t(tKeys.staked.getKey()),
        value: '185.34 PTK',
      },
      {
        title: t(tKeys.credit.getKey()),
        value: '280 DAI',
      },
    ],
    [t],
  );

  return (
    <Card>
      <CardContent>
        <Box mb={3}>
          <Typography className={classes.title} variant="subtitle2">
            {t(tKeys.title.getKey())}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {metrics.map(({ title, value, profit }) => (
            <Grid item xs={12}>
              <Metric title={title} value={value} profit={profit} theme="light" />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export { PersonalInformation };
