import React from 'react';
import { empty } from 'rxjs';

import { Loading, FormattedAmount } from 'components';
import { CreatingLoanProposalButton } from 'features/createLoanProposal';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';

import { StrategyCard } from '../StrategyCard';

export function BorrowingStrategy() {
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account, []);

  const [maxAvailableLoanSize, maxAvailableLoanSizeMeta] = useSubscribable(
    () => (account ? api.loanModule.getMaxAvailableLoanSize$(account) : empty()),
    [api, account],
  );

  const [loanConfig, loanConfigMeta] = useSubscribable(() => api.loanModule.getConfig$(), [api]);

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
          {maxAvailableLoanSize && <FormattedAmount sum={maxAvailableLoanSize} />}
        </Loading>
      }
      secondaryMetric={
        <Loading meta={loanConfigMeta}>
          {formattedMinInterestApr && <span>min {formattedMinInterestApr}% APR</span>}
        </Loading>
      }
      actionButton={<CreatingLoanProposalButton variant="contained" color="primary" />}
    />
  );
}
