import React from 'react';
import { of } from 'rxjs';
import BN from 'bn.js';

import { Loading, FormattedBalance } from 'components';
import { PTokenBuyingButton } from 'features/cashExchange';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { decimalsToWei } from 'utils/bn';
import { formatBalance } from 'utils/format';

import { StrategyCard } from '../StrategyCard';

export function ShareBuyingStrategy() {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);

  const [daiBalance, daiBalanceMeta] = useSubscribable(
    () => (account ? api.tokens.getBalance$('dai', account) : of(new BN(0))),
    [api, account],
    new BN(0),
  );

  const [ptkIncreasing, ptkIncreasingMeta] = useSubscribable(
    () => api.fundsModule.convertDaiToPtkEnter$(daiBalance.toString()),
    [api, daiBalance.toString()],
    new BN(0),
  );

  const [ptkBalance, ptkBalanceMeta] = useSubscribable(
    () => (account ? api.tokens.getBalance$('ptk', account) : of(new BN(0))),
    [api, account],
    new BN(0),
  );

  const [ptkTotalSupply, ptkTotalSupplyMeta] = useSubscribable(
    () => (account ? api.tokens.getTotalSupply$('ptk') : of(new BN(0))),
    [api, account],
    new BN(0),
  );

  const percentDecimals = 2;
  const shareIncreasing = calcShareIncreasingPercent(
    ptkBalance,
    ptkIncreasing,
    ptkTotalSupply,
    percentDecimals,
  );
  const formattedShareIncreasing = formatBalance({
    amountInBaseUnits: shareIncreasing,
    baseDecimals: percentDecimals,
  });

  return (
    <StrategyCard
      title="Buy share"
      primaryMetric={
        <Loading meta={daiBalanceMeta}>
          –<FormattedBalance sum={daiBalance.toString()} token="dai" />
        </Loading>
      }
      secondaryMetric={
        <Loading meta={[ptkIncreasingMeta, ptkBalanceMeta, ptkTotalSupplyMeta]}>
          {ptkIncreasing && (
            <>
              +
              <FormattedBalance sum={ptkIncreasing.toString()} token="ptk" /> (+
              {formattedShareIncreasing}%)
            </>
          )}
        </Loading>
      }
      description="Some text"
      actionButton={<PTokenBuyingButton fullWidth color="primary" variant="contained" />}
    />
  );
}

function calcShareIncreasingPercent(
  currentBalance: BN,
  balanceIncreasing: BN,
  totalSupply: BN,
  resultDecimals: number = 0,
): BN {
  if (totalSupply.isZero()) {
    return new BN(0);
  }
  const multiplier = decimalsToWei(resultDecimals).muln(100);
  const currentShare = currentBalance.mul(multiplier).div(totalSupply);
  const nextShare = currentBalance
    .add(balanceIncreasing)
    .mul(multiplier)
    .div(totalSupply.add(balanceIncreasing));
  return nextShare.sub(currentShare);
}
