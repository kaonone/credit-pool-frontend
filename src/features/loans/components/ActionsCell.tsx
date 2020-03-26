import * as React from 'react';
import BN from 'bn.js';

import { Debt, Status, usePledgeSubscription } from 'generated/gql/pool';
import { isEqualHex } from 'utils/hex';
import { bnToBn } from 'utils/bn';
import { Grid, Loading, Hint } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { getLoanDuePaymentDate, getPledgeId } from 'model';
import {
  ActivateLoanButton,
  RepayButton,
  UnstakeButton,
  UnlockButton,
  LiquidateLoanButton,
  CancelProposalButton,
} from 'features/cashExchange';

interface IProps {
  debt: Debt;
  account: string;
}

export function ActionsCell({ debt, account }: IProps) {
  const {
    total,
    borrower,
    debt_id: debtId,
    last_update: lastUpdate,
    status,
    stakeProgress,
    proposal_id: proposalId,
  } = debt;
  const api = useApi();
  const [config, configMeta] = useSubscribable(() => api.loanModule.getConfig$(), []);

  const pledgeHash = React.useMemo(() => getPledgeId(account, borrower, proposalId), [
    account,
    borrower,
    proposalId,
  ]);
  const pledgeGqlResult = usePledgeSubscription({ variables: { pledgeHash } });

  const pInterest = new BN(pledgeGqlResult.data?.pledge?.pInterest || '0');
  const pLocked = new BN(pledgeGqlResult.data?.pledge?.pLocked || '0');

  const duePaymentDate =
    config && getLoanDuePaymentDate(lastUpdate, config.debtRepayDeadlinePeriod)?.getTime();
  const isDuePaymentExpired = duePaymentDate && duePaymentDate < Date.now();

  const isMyLoan = isEqualHex(borrower, account);

  const isAvailableForUnstake = status === Status.Proposed && !isMyLoan && pLocked.gtn(0);
  const isAvailableForProposalCanceling = status === Status.Proposed && isMyLoan;
  const isAvailableForActivation =
    isMyLoan && status === Status.Proposed && bnToBn(stakeProgress).gten(100);

  const isAvailableForLiquidation = status !== Status.Closed && isDuePaymentExpired;
  const isAvailableForRepay =
    isMyLoan && (status === Status.Executed || status === Status.PartiallyRepayed);
  const isAvailableForUnlock = pInterest.gtn(0);

  const commonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    fullWidth: true,
    children: () => <Hint>Coming soon</Hint>,
  } as const;

  const actions = [
    isAvailableForActivation ? (
      <ActivateLoanButton
        borrower={borrower}
        proposalId={proposalId}
        loanAmount={total}
        {...commonProps}
      >
        Activate
      </ActivateLoanButton>
    ) : null,
    isAvailableForProposalCanceling ? (
      <CancelProposalButton borrower={borrower} proposalId={proposalId} {...commonProps}>
        Cancel
      </CancelProposalButton>
    ) : null,
    isAvailableForRepay && lastUpdate && debtId ? (
      <RepayButton
        account={borrower}
        debtId={debtId}
        lastPaymentDate={lastUpdate}
        {...commonProps}
      />
    ) : null,
    isAvailableForUnstake ? (
      <UnstakeButton
        borrower={borrower}
        proposalId={proposalId}
        loanSize={total}
        {...commonProps}
      />
    ) : null,
    isAvailableForUnlock && debtId ? (
      <UnlockButton borrower={borrower} proposalId={proposalId} debtId={debtId} {...commonProps} />
    ) : null,
    isAvailableForLiquidation && debtId ? (
      <LiquidateLoanButton borrower={borrower} debtId={debtId} {...commonProps}>
        Liquidate
      </LiquidateLoanButton>
    ) : null,
  ].filter(Boolean);

  return (
    <Loading meta={configMeta} gqlResults={pledgeGqlResult}>
      {actions.length ? (
        <Grid container spacing={1}>
          {actions.map((action, index) => (
            <Grid xs item key={index}>
              {action}
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Loading>
  );
}
