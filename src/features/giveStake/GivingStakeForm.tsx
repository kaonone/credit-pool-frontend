import React, { useCallback, useMemo } from 'react';
import { combineLatest, empty } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormWithConfirmation, LiquidityAmountField, FieldNames, SpyField } from 'components/form';
import { LiquidityAmount } from 'model/entities';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useValidateAmount } from 'utils/react';
import { Loading } from 'components';
import { roundWei, min } from 'utils/bn';
import { calcInterestShare } from 'model';
import { formatBalance } from 'utils/format';

interface FormData {
  amount: LiquidityAmount | null;
}

interface GivingStakeFormProps {
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

const tKeys = tKeysAll.features.sellShare;

export function GivingStakeForm({
  onCancel,
  account,
  borrower,
  loanSize,
  proposalId,
}: GivingStakeFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const maxValue = useMemo(
    () =>
      combineLatest([
        api.fundsModule.getLiquidityCurrency$(),
        api.fundsModule.getPtkBalanceInDaiWithoutFee$(account),
        api.loanModule.getPledgeRequirements$(borrower, proposalId),
      ]).pipe(
        map(([liquidityCurrency, balance, { maxLPledge }]) => {
          const roundedBalance = roundWei(balance, liquidityCurrency.decimals, 'floor', 2);
          const roundedMaxStakeSize = roundWei(
            maxLPledge.toBN(),
            liquidityCurrency.decimals,
            'ceil',
            2,
          );

          return min(roundedBalance, roundedMaxStakeSize);
        }),
      ),
    [api, account, borrower, proposalId],
  );
  const minValue = useMemo(
    () =>
      api.loanModule
        .getPledgeRequirements$(borrower, proposalId)
        .pipe(map(({ minLPledge }) => minLPledge)),
    [api, borrower, proposalId],
  );

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue,
    minValue,
  });

  const handleFormSubmit = useCallback(
    ({ amount }: FormData) => {
      return amount
        ? api.loanModule.stakePtk(account, {
            borrower,
            proposalId,
            sourceAmount: amount,
          })
        : undefined;
    },
    [account, api, borrower, proposalId],
  );

  const [liquidityCurrency, liquidityCurrencyMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [api],
  );

  const getConfirmationMessage = useCallback(
    ({ amount }: FormData) => {
      return amount
        ? api.loanModule.calculateFullLoanStake$(loanSize).pipe(
            map(fullLoanStake => {
              const rawSourceAmount = amount.toBN();

              const interestShareDecimals = 2;
              const rawInterestShareDelta = calcInterestShare(
                rawSourceAmount,
                fullLoanStake,
                interestShareDecimals,
              );

              const interestShareDelta = `${formatBalance({
                amountInBaseUnits: rawInterestShareDelta,
                baseDecimals: interestShareDecimals,
              })}%`;

              return t(tKeys.confirmMessage.getKey(), {
                interestShareDelta,
                sourceAmount: amount.toFormattedString(),
              });
            }),
          )
        : empty();
    },
    [api, loanSize],
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
