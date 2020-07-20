import * as React from 'react';

import { Grid, Title, Button } from 'components';
import {
  TotalValueLocked,
  AverageAPY,
  AvailableForBorrowing,
  TotalValueLocked24h,
  AverageLoanSize,
  TotalBorrowed,
  TotalAKROEarned,
  Proposals,
  MinimumAPY,
  AveragePassiveAPY,
  AverageLoanTerm,
  LoanTerm,
} from 'features/metrics';
import { makeStyles } from 'utils/styles';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

const tKeys = tKeysAll.app.pages.strategies;

export function StrategiesPage() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container justify="space-between">
        <Grid item className={classes.metricContainer}>
          <div className={classes.title}>
            <Title fontSize="large" hint={t(tKeys.liquidityProvisionHint.getKey())}>
              {t(tKeys.liquidityProvisionTitle.getKey())}
            </Title>
          </div>
          <TotalValueLocked />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <div className={classes.title}>
            <Title fontSize="large">{t(tKeys.lendingTitle.getKey())}</Title>
          </div>
          <AverageAPY />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <div className={classes.title}>
            <Title fontSize="large">{t(tKeys.borrowingTitle.getKey())}</Title>
          </div>
          <AvailableForBorrowing />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item className={classes.metricContainer}>
          <TotalValueLocked24h />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <AverageLoanSize />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <TotalBorrowed />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item className={classes.metricContainer}>
          <TotalAKROEarned />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <Proposals />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <MinimumAPY />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item className={classes.metricContainer}>
          <AveragePassiveAPY />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <AverageLoanTerm />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <LoanTerm />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item className={classes.metricContainer}>
          <div className={classes.advantages}>
            <Title>{t(tKeys.liquidityAdvantages.getKey())}</Title>
          </div>
          <Button fullWidth color="primary" variant="contained">
            {t(tKeys.liquidityButton.getKey())}
          </Button>
        </Grid>
        <Grid item className={classes.metricContainer}>
          <div className={classes.advantages}>
            <Title>{t(tKeys.lendingAdvantages.getKey())}</Title>
          </div>
          <Button fullWidth color="primary" variant="contained">
            {t(tKeys.lendingButton.getKey())}
          </Button>
        </Grid>
        <Grid item className={classes.metricContainer}>
          <div className={classes.advantages}>
            <Title>{t(tKeys.borrowingAdvantages.getKey())}</Title>
          </div>
          <Button fullWidth color="primary" variant="contained">
            {t(tKeys.borrowingButton.getKey())}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    padding: 50,
  },
  metricContainer: {
    marginBottom: 50,
    maxWidth: 272,
    width: '100%',
  },
  title: {
    marginBottom: 28,
  },
  advantages: {
    marginBottom: 25,
  },
}));
