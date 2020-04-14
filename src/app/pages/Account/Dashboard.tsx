import React from 'react';
import BN from 'bn.js';
import { of } from 'rxjs';

import { Grid, Button, Loading, FormattedBalance } from 'components';
import { PTokenBuyingButton, PTokenSellingButton } from 'features/cashExchange';
import { WithdrawDistributionsButton } from 'features/distibutions';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { AccountMetricCard } from './AccountMetricCard';

export function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Balance />
      </Grid>
      <Grid item xs={4}>
        <AccountMetricCard
          title="Yield (Coming soon)"
          primaryMetric="$0"
          secondaryMetric="~0% APR"
          actionButtons={[
            <Button disabled fullWidth color="primary" variant="contained">
              Withdraw
            </Button>,
          ]}
        />
      </Grid>
      <Grid item xs={4}>
        <Distribution />
      </Grid>
    </Grid>
  );
}

function Balance() {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);
  const [ptkBalance, ptkBalanceMeta] = useSubscribable(
    () => (account ? api.tokens.getBalance$('ptk', account) : of(new BN(0))),
    [api, account],
    new BN(0),
  );
  const [daiBalance, daiBalanceMeta] = useSubscribable(
    () => api.fundsModule.getPtkToDaiExitInfo$(ptkBalance.toString()),
    [api, ptkBalance.toString()],
  );

  return (
    <AccountMetricCard
      title="Share"
      primaryMetric={
        <Loading meta={daiBalanceMeta}>
          {daiBalance && <FormattedBalance sum={daiBalance.user.toString()} token="dai" />}
        </Loading>
      }
      secondaryMetric={
        <Loading meta={ptkBalanceMeta}>
          <FormattedBalance sum={ptkBalance.toString()} token="ptk" />
        </Loading>
      }
      actionButtons={[
        <PTokenBuyingButton fullWidth color="primary" variant="contained" />,
        <PTokenSellingButton fullWidth color="primary" variant="contained" />,
      ]}
    />
  );
}

function Distribution() {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);
  const [accumulated, accumulatedMeta] = useSubscribable(
    () => (account ? api.tokens.getAccumulatedUserDistributions$(account) : of(new BN(0))),
    [api, account],
    new BN(0),
  );
  const [accumulatedInDaiInfo, accumulatedInDaiMeta] = useSubscribable(
    () => api.fundsModule.getPtkToDaiExitInfo$(accumulated.toString()),
    [api, accumulated.toString()],
  );

  return (
    <AccountMetricCard
      title="Distribution"
      primaryMetric={
        <Loading meta={accumulatedInDaiMeta}>
          {accumulatedInDaiInfo && (
            <FormattedBalance sum={accumulatedInDaiInfo.total.toString()} token="dai" />
          )}
        </Loading>
      }
      secondaryMetric={
        <Loading meta={accumulatedMeta}>
          <FormattedBalance sum={accumulated.toString()} token="ptk" />
        </Loading>
      }
      actionButtons={[
        <WithdrawDistributionsButton fullWidth color="primary" variant="contained" />,
      ]}
    />
  );
}
