import React, { useCallback, useMemo } from 'react';
import { empty, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';

import { FormWithConfirmation, LiquidityAmountField, FieldNames, SpyField } from 'components/form';
import { LiquidityAmount } from 'model/entities';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useValidateAmount } from 'utils/react';
import { Loading } from 'components';
import { calcInterestShare, getPledgeId } from 'model';
import { formatBalance } from 'utils/format';
import { zeroAddress } from 'utils/mock';
import { usePledgeSubscription } from 'generated/gql/pool';

interface FormData {
  amount: LiquidityAmount | null;
}

interface UnstakingFormProps {
  account: string;
  loanSize: string;
  proposalId: string;
  borrower: string;
  onCancel(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

const initialValues: FormData = {
  amount: null,
};

const tKeys = tKeysAll.features.unstake;

const zero = new BN(0);

export function UnstakingForm({
  onCancel,
  account,
  borrower,
  loanSize,
  proposalId,
}: UnstakingFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const pledgeGqlResult = usePledgeSubscription({
    variables: {
      pledgeHash: account && proposalId ? getPledgeId(account, borrower, proposalId) : '',
    },
  });
  const pInitialLocked = pledgeGqlResult.data?.pledge?.pInitialLocked || '0';
  const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';

  const maxValue = useMemo(
    () =>
      api.fundsModule
        .getAvailableBalanceIncreasing$(account || zeroAddress, pInitialLocked, lInitialLocked)
        .pipe(map(item => item.toBN())),
    [api, account, pInitialLocked, lInitialLocked],
  );

  const minValue = zero;

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue,
    minValue,
  });

  const handleFormSubmit = useCallback(
    ({ amount }: FormData) => {
      return amount
        ? api.loanModule.unstakePtk(account, {
            borrower,
            proposalId,
            lInitialLocked,
            pInitialLocked,
            sourceAmount: amount,
          })
        : undefined;
    },
    [account, api, borrower, proposalId, lInitialLocked, pInitialLocked],
  );

  const [liquidityCurrency, liquidityCurrencyMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [api],
  );

  const getConfirmationMessage = useCallback(
    ({ amount }: FormData) => {
      return amount
        ? combineLatest([
            api.fundsModule.getAvailableBalanceIncreasing$(
              account || zeroAddress,
              pInitialLocked,
              lInitialLocked,
            ),
            api.loanModule.calculateFullLoanStake$(loanSize),
          ]).pipe(
            map(([currentFullStakeCost, fullLoanStake]) => {
              const interestShareDecimals = 2;

              const lAmountForUnstakeByInitial = new BN(lInitialLocked)
                .mul(amount.toBN())
                .div(currentFullStakeCost.toBN());

              const rawInterestShareDelta = calcInterestShare(
                lAmountForUnstakeByInitial,
                fullLoanStake,
                interestShareDecimals,
              );

              const interestShareDelta = `${formatBalance({
                amountInBaseUnits: rawInterestShareDelta,
                baseDecimals: interestShareDecimals,
              })}%`;

              return t(tKeys.confirmMessage.getKey(), {
                sourceAmount: amount.toFormattedString(),
                interestShareDelta,
              });
            }),
          )
        : empty();
    },
    [api, loanSize, loanSize, pInitialLocked, lInitialLocked],
  );

  return (
    <FormWithConfirmation<FormData>
      title={t(tKeys.formTitle.getKey())}
      initialValues={initialValues}
      getConfirmationMessage={getConfirmationMessage}
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
    >
      <Loading meta={liquidityCurrencyMeta}>
        {liquidityCurrency && (
          <>
            <LiquidityAmountField
              name={fieldNames.amount}
              currencies={[liquidityCurrency]}
              placeholder={t(tKeys.placeholder.getKey())}
              validate={validateAmount}
              maxValue={maxValue}
            />
            <SpyField name="__" fieldValue={validateAmount} />
          </>
        )}
      </Loading>
    </FormWithConfirmation>
  );
}
