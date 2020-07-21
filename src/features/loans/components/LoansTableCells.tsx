import React from 'react';

import { Loading, FormattedAmount } from 'components';
import { getPledgeId } from 'model/getPledgeId';
import { usePledgeSubscription, Status } from 'generated/gql/pool';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { useTranslate } from 'services/i18n';

interface MyEarnCellProps {
  supporter: string;
  borrower: string;
  proposalId: string;
}

export function MyEarnCell({ supporter, borrower, proposalId }: MyEarnCellProps) {
  const pledgeHash = React.useMemo(() => getPledgeId(supporter, borrower, proposalId), [
    supporter,
    borrower,
    proposalId,
  ]);

  const api = useApi();

  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });
  const pInterest = pledgeGqlResult.data?.pledge?.pInterest || '0';

  const [interestCost, interestCostMeta] = useSubscribable(
    () => api.fundsModule.getAvailableBalanceIncreasing$(supporter, pInterest, '0'),
    [supporter, pInterest],
  );

  return (
    <Loading gqlResults={pledgeGqlResult} meta={interestCostMeta}>
      {interestCost?.gt(0) ? <FormattedAmount sum={interestCost} /> : '—'}
    </Loading>
  );
}

interface StatusProps {
  status: Status;
  pledgeProgress: number;
}

export function StatusCell({ status, pledgeProgress }: StatusProps) {
  const { t, tKeys } = useTranslate();

  return (
    <>
      {t(tKeys.features.loans.loansPanel.statuses[status].getKey(), {
        pledgeProgress,
      })}
    </>
  );
}
