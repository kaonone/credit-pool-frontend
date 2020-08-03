import * as React from 'react';

import { Grid, Label } from 'components';
import {
  PoolSize,
  AverageAPY,
  AvailableForBorrowing,
  PoolSize24h,
  AverageLoanSize,
  TotalBorrowed,
  TotalAKROEarned,
  Proposals,
  MinimumAPY,
  AvgPoolAPY,
  AverageLoanTerm,
  LoanTerm,
} from 'features/metrics';
import { BuyingShareButton } from 'features/buyShare';
import { makeStyles } from 'utils/styles';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

const tKeys = tKeysAll.app.pages.strategies;

export function Strategies() {
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container justify="space-between">
        <Grid item className={classes.metricContainer}>
          <div className={classes.title}>
            <Label fontSize="large" hint={t(tKeys.liquidityProvisionHint.getKey())}>
              {t(tKeys.liquidityProvisionTitle.getKey())}
            </Label>
          </div>
          <PoolSize title="Total Value Locked" withoutEstablished />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <div className={classes.title}>
            <Label fontSize="large">{t(tKeys.lendingTitle.getKey())}</Label>
          </div>
          <AverageAPY />
        </Grid>
        <Grid item className={classes.metricContainer}>
          <div className={classes.title}>
            <Label fontSize="large">{t(tKeys.borrowingTitle.getKey())}</Label>
          </div>
          <AvailableForBorrowing />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item className={classes.metricContainer}>
          <PoolSize24h />
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
          <AvgPoolAPY title="Average passive APY" />
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
            <Label>{t(tKeys.liquidityAdvantages.getKey())}</Label>
          </div>
          <BuyingShareButton fullWidth variant="contained" color="primary">
            {t(tKeys.liquidityButton.getKey())}
          </BuyingShareButton>
        </Grid>
        <Grid item className={classes.metricContainer}>
          <div className={classes.advantages}>
            <Label>{t(tKeys.lendingAdvantages.getKey())}</Label>
          </div>
          <BuyingShareButton
            fullWidth
            variant="contained"
            color="primary"
            note={t(tKeys.noteAboutLending.getKey())}
          >
            {t(tKeys.lendingButton.getKey())}
          </BuyingShareButton>
        </Grid>
        <Grid item className={classes.metricContainer}>
          <div className={classes.advantages}>
            <Label>{t(tKeys.borrowingAdvantages.getKey())}</Label>
          </div>
          <BuyingShareButton
            fullWidth
            variant="contained"
            color="primary"
            note={t(tKeys.noteAboutBorrowing.getKey())}
          >
            {t(tKeys.borrowingButton.getKey())}
          </BuyingShareButton>
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
