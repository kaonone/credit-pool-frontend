import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { ProgressBar } from './ProgressBar/ProgressBar';
import { useStyles } from './Progress.style';

interface IProps {
  percent: number;
  timeLeft: number;
}

function Progress(props: IProps) {
  const { percent, timeLeft } = props;
  const classes = useStyles();
  const { t } = useTranslate();
  const tKeys = tKeysAll.components.activitiesCard;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ProgressBar title={t(tKeys.collateral.getKey())} value={percent} />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography component="span" variant="subtitle1" className={classes.timeLeftTitle}>
              {t(tKeys.timeLeft.getKey())}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="span" variant="subtitle1" className={classes.timeLeftValue}>
              {`${timeLeft}min`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { Progress };
