/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { CashMetric } from 'components/CashMetric/CashMetric';
import { Metric } from 'components/Metric/Metric';
import { ShortAddress } from 'components/ShortAddress/ShortAddress';
import {
  LendIcon,
  ContainedCircleArrow,
  OutlinedCircleArrow,
  Checked,
  ContainedCross,
} from 'components/icons';

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
  const [expanded, setExpanded] = React.useState(false);

  const isOver = status === 'APPROVED' || status === 'DECLINED';

  const handleExpansionPanelChange = (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Grid className={classes.root} container wrap="nowrap">
      <Grid item xs={9} className={classes.mainInformation}>
        <Grid container spacing={3} className={classes.metrics}>
          <Grid item xs={2}>
            <CashMetric
              title={t(tKeys.lend.getKey())}
              value={lendValue}
              symbol="DAI"
              icon={<LendIcon className={classes.lendIcon} />}
            />
          </Grid>
          <Grid item xs={3}>
            <Metric title={t(tKeys.to.getKey())} value={<ShortAddress address={address} />} />
          </Grid>
          <Grid item xs={2}>
            <Metric title={t(tKeys.apr.getKey())} value={`${aprValue}%`} />
          </Grid>
          <Grid item xs={5} className={classes.highlightedMetric}>
            <CashMetric
              title={t(tKeys.staked.getKey())}
              value={stakedValue}
              symbol="PTK"
              needed={neededValue}
            />
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel
              onChange={handleExpansionPanelChange}
              className={classes.expansionPanel}
            >
              <ExpansionPanelSummary
                className={classes.expansionPanelSummary}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {expanded && <ContainedCircleArrow className={classes.toggleExpandIcon} />}
                {!expanded && <OutlinedCircleArrow className={classes.toggleExpandIcon} />}
                <div className={classes.ellipsisRow}>
                  <Typography className={classes.showButtonText} component="span" noWrap>
                    {`${t(tKeys.expansionPanelTitle.getKey())}: `}
                  </Typography>
                  <Typography className={classes.detailsShortText} component="span" noWrap>
                    {expansionPanelDetails}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{expansionPanelDetails}</ExpansionPanelDetails>
            </ExpansionPanel>
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
          <Progress percent={progress} timeLeft={timeLeft} />
        )}
      </Grid>
    </Grid>
  );
}

export { ActivitiesCard };
