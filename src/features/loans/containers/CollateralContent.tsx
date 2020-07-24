import React from 'react';

import { LiquidityAmount, PercentAmount } from 'model/entities';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { calcShare } from 'domainLogic';

import {
  CollateralDistributionBar,
  Props as CollateralDistributionBarProps,
} from '../components/CollateralDistributionBar';

type Props = {
  loanRequested: LiquidityAmount;
  lStaked: LiquidityAmount;
};

export function CollateralContent(
  props: Props & Pick<CollateralDistributionBarProps, 'hideLabel'>,
) {
  const { loanRequested, lStaked, hideLabel } = props;
  const { userProvided, poolProvided } = useCollateral(loanRequested.toString(), lStaked);
  return (
    <CollateralDistributionBar
      userProvided={userProvided}
      poolProvided={poolProvided}
      hideLabel={hideLabel}
    />
  );
}

function useCollateral(loanRequested: string, lStaked: LiquidityAmount) {
  const api = useApi();

  const [fullLoanStake] = useSubscribable(
    () => api.loanModule.calculateFullLoanStake$(loanRequested),
    [loanRequested],
  );

  const lBorrowerStake = fullLoanStake?.divn(3); // TODO: add this value in subgraph to be able to calc collateral

  return {
    poolProvided:
      fullLoanStake && lBorrowerStake
        ? calcShare(fullLoanStake, lStaked.sub(lBorrowerStake))
        : new PercentAmount(0),
    userProvided:
      lBorrowerStake && fullLoanStake
        ? calcShare(fullLoanStake, lBorrowerStake)
        : new PercentAmount(0),
  };
}
