import React from 'react';
import { of } from 'rxjs';
import BN from 'bn.js';

import { Loading, FormattedBalance } from 'components';
import { BuyingShareButton } from 'features/buyShare';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { decimalsToWei } from 'utils/bn';
import { formatBalance } from 'utils/format';
import { ETH_NETWORK_CONFIG } from 'env';

import { StrategyCard } from '../StrategyCard';

export function ShareBuyingStrategy() {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);

  const [daiBalance, daiBalanceMeta] = useSubscribable(
    () => (account ? api.erc20.getDaiBalance$(account) : of(new BN(0))),
    [api, account],
    new BN(0),
  );

  const [ptkIncreasing, ptkIncreasingMeta] = useSubscribable(
    () => api.fundsModule.convertDaiToPtkEnter$(daiBalance.toString()),
    [api, daiBalance.toString()],
    new BN(0),
  );

  const [ptkDistributionBalance, ptkDistributionBalanceMeta] = useSubscribable(
    () => (account ? api.pToken.getPtkDistributionBalance$(account) : of(new BN(0))),
    [api, account],
    new BN(0),
  );

  const [ptkTotalSupply, ptkTotalSupplyMeta] = useSubscribable(
    () => (account ? api.erc20.getTotalSupply$(ETH_NETWORK_CONFIG.contracts.ptk) : of(new BN(0))),
    [api, account],
    new BN(0),
  );

  const percentDecimals = 2;
  const shareIncreasing = calcShareIncreasingPercent(
    ptkDistributionBalance,
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
          <FormattedBalance sum={daiBalance.toString()} token="dai" />
        </Loading>
      }
      secondaryMetric={
        <Loading meta={[ptkIncreasingMeta, ptkDistributionBalanceMeta, ptkTotalSupplyMeta]}>
          {ptkIncreasing && (
            <>
              +
              <FormattedBalance sum={ptkIncreasing.toString()} token="ptk" /> (+
              {formattedShareIncreasing}%)
            </>
          )}
        </Loading>
      }
      actionButton={<BuyingShareButton fullWidth color="primary" variant="contained" />}
    />
  );
}

function calcShareIncreasingPercent(
  currentBalance: BN,
  balanceIncreasing: BN,
  totalSupply: BN,
  resultDecimals: number = 0,
): BN {
  const multiplier = decimalsToWei(resultDecimals).muln(100);

  const currentShare = totalSupply.isZero()
    ? new BN(0)
    : currentBalance.mul(multiplier).div(totalSupply);

  const nextTotalSupply = totalSupply.add(balanceIncreasing);
  const nextShare = nextTotalSupply.isZero()
    ? new BN(0)
    : currentBalance.add(balanceIncreasing).mul(multiplier).div(nextTotalSupply);

  return nextShare.sub(currentShare);
}
