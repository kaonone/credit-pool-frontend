import { useApi } from 'services/api';
import { useSubscribable, ISubscriptionMeta } from 'utils/react';
import { usePledgeSubscription } from 'generated/gql/pool';
import { getPledgeId } from 'model';
import { LiquidityAmount } from 'model/entities';
import { Status } from 'generated/gql/subgraphRequests';

export type PledgeHashData = {
  supporter: string;
  borrower: string;
  proposalId: string;
};

export type StakeCostData = {
  status: Status;
  loanBody: string;
};

export function useMyStakeCost({
  supporter,
  borrower,
  proposalId,
  status,
  loanBody,
}: PledgeHashData & StakeCostData): [LiquidityAmount | null, ISubscriptionMeta] {
  const api = useApi();

  const pledgeHash = getPledgeId(supporter, borrower, proposalId);
  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';
  const pLocked = pledgeGqlResult.data?.pledge?.pLocked || '0';
  const additionalLiquidity = status === Status.Proposed ? lInitialLocked : loanBody;

  const [myStakeCost, myStakeCostMeta] = useSubscribable(
    () => api.fundsModule.getAvailableBalanceIncreasing$(supporter, pLocked, additionalLiquidity),
    [supporter, pLocked, additionalLiquidity],
  );

  return [myStakeCost || null, myStakeCostMeta];
}
