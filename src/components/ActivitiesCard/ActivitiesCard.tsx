/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { StakeButton } from 'features/cashExchange';
import { CashMetric } from 'components/CashMetric/CashMetric';
import { Metric } from 'components/Metric/Metric';
import { ShortAddress } from 'components/ShortAddress/ShortAddress';
import { ExpansionPanel } from 'components/ExpansionPanel/ExpansionPanel';
import { LendIcon, Checked, ContainedCross } from 'components/icons';

import { useStyles } from './ActivitiesCard.style';
import { Progress } from './Progress/Progress';

const tKeys = tKeysAll.components.activitiesCard;

interface IOwnProps {
  lendValue: string;
  address: string;
  aprValue: number;
  stakedValue: string;
  neededValue: string;
  progress: number;
  timeLeft: number;
  expansionPanelDetails: string;
  status: 'APPROVED' | 'DECLINED' | 'PENDING';
}

function ActivitiesCard(props: IOwnProps) {
  const {
    lendValue,
    address,
    aprValue,
    stakedValue,
    neededValue,
    progress,
    timeLeft,
    expansionPanelDetails,
    status,
  } = props;

  const classes = useStyles();
  const { t } = useTranslate();

  const isOver = status === 'APPROVED' || status === 'DECLINED';

  return (
    <Grid className={classes.root} container wrap="nowrap">
      <Grid item xs={9} className={classes.mainInformation}>
        <Grid container spacing={3} className={classes.metrics}>
          <Grid item xs>
            <CashMetric
              title={t(tKeys.lend.getKey())}
              value={lendValue}
              token="dai"
              icon={<LendIcon className={classes.lendIcon} />}
            />
          </Grid>
          <Grid item xs>
            <Metric title={t(tKeys.to.getKey())} value={<ShortAddress address={address} />} />
          </Grid>
          <Grid item xs>
            <Metric title={t(tKeys.apr.getKey())} value={`${aprValue}%`} />
          </Grid>
          <Grid item xs className={classes.highlightedMetric}>
            <CashMetric
              title={t(tKeys.staked.getKey())}
              value={stakedValue}
              token="ptk"
              needed={neededValue}
            />
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel
              title={`${t(tKeys.expansionPanelTitle.getKey())}: `}
              details={expansionPanelDetails}
              showPreview
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} className={classes.collateral}>
        {isOver ? (
          <Grid container spacing={3} justify="center" direction="column">
            <Grid item>
              <Grid container wrap="nowrap" alignItems="center" justify="center">
                {status === 'APPROVED' && <Checked className={classes.votingForIcon} />}
                {status === 'DECLINED' && <ContainedCross className={classes.votingAgainstIcon} />}
                <Typography variant="h6">{t(tKeys.status[status].getKey())}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} justify="center" direction="column">
            <Grid item>
              <Progress percent={progress} timeLeft={timeLeft} />
            </Grid>
            <Grid item>
              <StakeButton variant="contained" color="primary" fullWidth />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export { ActivitiesCard };
