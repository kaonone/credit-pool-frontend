import { useApi } from 'services/api';
import { useSubscribable, ISubscriptionMeta } from 'utils/react';
import { usePledgeSubscription } from 'generated/gql/pool';
import { getPledgeId, calcInterestShare } from 'model';
import { PercentAmount } from 'model/entities';

import { PledgeHashData } from './useMyStakeCost';

export type InterestShareData = {
  initialLoanSize: string;
};

export function useMyInterestShare({
  supporter,
  borrower,
  proposalId,
  initialLoanSize,
}: InterestShareData & PledgeHashData): [PercentAmount | null, ISubscriptionMeta] {
  const api = useApi();

  const interestShareDecimals = 2;
  const pledgeHash = getPledgeId(supporter, borrower, proposalId);
  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });
  const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';

  const [fullLoanStake, fullLoanStakeMeta] = useSubscribable(
    () => api.loanModule.calculateFullLoanStake$(initialLoanSize),
    [initialLoanSize],
  );

  const interestShare =
    fullLoanStake && calcInterestShare(lInitialLocked, fullLoanStake, interestShareDecimals);

  return [interestShare || null, fullLoanStakeMeta];
}
