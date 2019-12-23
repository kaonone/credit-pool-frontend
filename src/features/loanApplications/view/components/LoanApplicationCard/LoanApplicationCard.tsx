import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { StakeButton } from 'features/cashExchange';
import { CashMetric, Metric, ShortAddress, ActivitiesCard } from 'components';
import { LendIcon, Checked, ContainedCross } from 'components/icons';

import { Progress } from '../Progress/Progress';
import { useStyles } from './LoanApplicationCard.style';

const tKeys = tKeysAll.features.loanApplications;

interface IProps {
  lendValue: string;
  address: string;
  aprValue: number;
  stakedValue: string;
  neededValue: string;
  progressInPercents: number;
  timeLeft: number;
  expansionPanelDetails: string;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
}

function LoanApplicationCard(props: IProps) {
  const {
    lendValue,
    address,
    aprValue,
    stakedValue,
    neededValue,
    progressInPercents,
    timeLeft,
    expansionPanelDetails,
    status,
  } = props;

  const classes = useStyles();
  const { t } = useTranslate();

  const isOver = status === 'APPROVED' || status === 'DECLINED';

  const metricsList = React.useMemo(
    () => [
      <CashMetric
        title={t(tKeys.lend.getKey())}
        value={lendValue}
        token="dai"
        icon={<LendIcon className={classes.lendIcon} />}
      />,
      <Metric title={t(tKeys.to.getKey())} value={<ShortAddress address={address} />} />,
      <Metric title={t(tKeys.apr.getKey())} value={`${aprValue}%`} />,
      <span className={classes.highlightedMetric}>
        <CashMetric
          title={t(tKeys.staked.getKey())}
          value={stakedValue}
          token="ptk"
          needed={neededValue}
        />
      </span>,
    ],
    [t, lendValue, address, stakedValue, neededValue],
  );

  const asideContent = React.useMemo(
    () =>
      isOver ? (
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
            <Progress progressInPercents={progressInPercents} timeLeft={timeLeft} />
          </Grid>
          <Grid item>
            <StakeButton variant="contained" color="primary" fullWidth />
          </Grid>
        </Grid>
      ),
    [t, status, progressInPercents, timeLeft],
  );

  return (
    <ActivitiesCard
      metricsList={metricsList}
      expansionPanelDetails={expansionPanelDetails}
      asideContent={asideContent}
    />
  );
}

export { LoanApplicationCard };
