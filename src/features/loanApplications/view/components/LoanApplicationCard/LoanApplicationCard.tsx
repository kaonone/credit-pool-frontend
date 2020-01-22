import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BN from 'bn.js';

import { Status } from 'generated/gql/pool';
import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { StakeButton } from 'features/cashExchange';
import { CashMetric, Metric, ShortAddress, ActivitiesCard, Loading } from 'components';
import { LendIcon, Checked, ContainedCross } from 'components/icons';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';

import { useStyles } from './LoanApplicationCard.style';
import { Progress } from '../Progress/Progress';

const tKeys = tKeysAll.features.loanApplications;

interface IProps {
  lendValue: string;
  address: string;
  aprValue: string;
  stakedValue: string;
  expansionPanelDetails: string;
  status: Status;
}

function LoanApplicationCard(props: IProps) {
  const { lendValue, address, aprValue, stakedValue, expansionPanelDetails, status } = props;

  const classes = useStyles();
  const { t } = useTranslate();

  const api = useApi();
  const [aprDecimals, aprDecimalsMeta] = useSubscribable(() => api.getAprDecimals$(), [], 0);

  const isOver = status !== 'PROPOSED';

  const metricsList = React.useMemo(
    () => [
      <CashMetric
        title={t(tKeys.lend.getKey())}
        value={lendValue}
        token="dai"
        icon={<LendIcon className={classes.lendIcon} />}
      />,
      <Metric title={t(tKeys.to.getKey())} value={<ShortAddress address={address} />} />,
      <Metric
        title={t(tKeys.apr.getKey())}
        value={
          <Loading meta={aprDecimalsMeta}>
            {formatBalance({ amountInBaseUnits: aprValue, baseDecimals: aprDecimals })}%
          </Loading>
        }
      />,
      <span className={classes.highlightedMetric}>
        <CashMetric title={t(tKeys.staked.getKey())} value={stakedValue} token="dai" />
      </span>,
    ],
    [t, lendValue, address, aprValue, stakedValue, aprDecimals, aprDecimalsMeta],
  );

  const progressInPercents = new BN(stakedValue)
    .muln(100)
    .div(new BN(lendValue))
    .toNumber();

  const asideContent = React.useMemo(
    () =>
      isOver ? (
        <Grid container spacing={3} justify="center" direction="column">
          <Grid item>
            <Grid container wrap="nowrap" alignItems="center" justify="center">
              {(status === 'APPROVED' || status === 'PARTIALLY_REPAYED' || status === 'CLOSED') && (
                <Checked className={classes.votingForIcon} />
              )}
              {status === 'DECLINED' && <ContainedCross className={classes.votingAgainstIcon} />}
              <Typography variant="h6">{t(tKeys.status[status].getKey())}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} justify="center" direction="column">
          <Grid item>
            <Progress progressInPercents={progressInPercents} />
          </Grid>
          <Grid item>
            <StakeButton variant="contained" color="primary" fullWidth />
          </Grid>
        </Grid>
      ),
    [t, isOver, status, progressInPercents],
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
