import React from 'react';
import { Link } from 'react-router-dom';
import { of } from 'rxjs';
import BN from 'bn.js';

import { Grid, Button, Loading, FormattedBalance } from 'components';
import { routes } from 'app/routes';
import { GetLoanButton } from 'features/cashExchange';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';

import { StrategyCard } from '../StrategyCard';
import { ShareBuyingStrategy } from './ShareBuyingStrategy';

export function Strategies() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <ShareBuyingStrategy />
      </Grid>
      <Grid item xs={4}>
        <StrategyCard
          title="Lending"
          primaryMetric="130 proposals"
          secondaryMetric="~60% APR"
          description="High interest, high risk"
          actionButton={
            <Button
              component={Link}
              fullWidth
              color="primary"
              variant="contained"
              to={routes.proposals.getRedirectPath()}
            >
              Lend
            </Button>
          }
        />
      </Grid>
      <Grid item xs={4}>
        <BorrowingStrategy />
      </Grid>
    </Grid>
  );
}
function BorrowingStrategy() {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);

  const [maxAvailableLoanSize, maxAvailableLoanSizeMeta] = useSubscribable(
    () => (account ? api.loanModule.getMaxAvailableLoanSizeInDai$(account) : of(new BN(0))),
    [api, account],
    new BN(0),
  );
  const [loanConfig, loanConfigMeta] = useSubscribable(() => api.loanModule.getConfig$(), [
    api,
    account,
  ]);

  const formattedMinInterestApr = loanConfig
    ? formatBalance({
        amountInBaseUnits: loanConfig.limits.debtInterestMin
          .muln(10000)
          .div(loanConfig.debtInterestMultiplier),
        baseDecimals: 2,
      })
    : null;

  return (
    <StrategyCard
      title="Borrowing"
      primaryMetric={
        <Loading meta={maxAvailableLoanSizeMeta}>
          <FormattedBalance sum={maxAvailableLoanSize.toString()} token="dai" />
        </Loading>
      }
      secondaryMetric={
        <Loading meta={loanConfigMeta}>
          {formattedMinInterestApr && <span>min {formattedMinInterestApr}% APR</span>}
        </Loading>
      }
      description="Some text"
      actionButton={<GetLoanButton />}
    />
  );
}
