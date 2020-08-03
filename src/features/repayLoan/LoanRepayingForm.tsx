import React, { useCallback, useMemo } from 'react';
import { empty } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';

import {
  FormWithConfirmation,
  FieldNames,
  SpyField,
  RadioGroupInputField,
  TokenAmountField,
} from 'components/form';
import { TokenAmount } from 'model/entities';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useValidateAmount } from 'utils/react';
import { Loading, FormControlLabel, Radio } from 'components';
import { RepaymentMethod, repaymentMethods } from 'model/types';
import { lessThenOrEqual } from 'utils/validators';
import { zeroAddress } from 'utils/mock';
import { max, min } from 'utils/bn';

interface FormData {
  amount: TokenAmount | null;
  repaymentMethod: RepaymentMethod;
}

interface LoanRepayingFormProps {
  debtId: string;
  lastPaymentDate: string;
  account: string;
  onCancel(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
  repaymentMethod: 'repaymentMethod',
};

const initialValues: FormData = {
  amount: null,
  repaymentMethod: 'fromOwnBalance',
};

const tKeys = tKeysAll.features.repayLoan;

const zero = new BN(0);

export function LoanRepayingForm({
  onCancel,
  account,
  debtId,
  lastPaymentDate,
}: LoanRepayingFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const maxValue = useMemo(
    () =>
      api.loanModule
        .getDebtRequiredPayments$(account, debtId, lastPaymentDate)
        .pipe(map(({ currentInterest, loanSize }) => currentInterest.add(loanSize))),
    [api, account, debtId, lastPaymentDate],
  );
  const minValue = zero;

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue,
    minValue,
  });

  const [availablePoolBalance, availablePoolBalanceMeta] = useSubscribable(
    () => api.fundsModule.getPtkBalanceInDaiWithFee$(account || zeroAddress),
    [api, account],
    new BN(0),
  );
  const [availableDaiBalance, availableDaiBalanceMeta] = useSubscribable(
    () => api.erc20.getDaiBalance$(account || zeroAddress),
    [api, account],
    new BN(0),
  );

  const validateForm = useCallback(
    ({ repaymentMethod, amount }: FormData) => {
      if (!amount) {
        return {};
      }

      const amountError =
        repaymentMethod === 'fromAvailablePoolBalance'
          ? lessThenOrEqual(
              availablePoolBalance,
              amount.toBN(),
              () => amount.withValue(availablePoolBalance).toFormattedString(),
              tKeys.insufficientBalanceError.getKey(),
            )
          : lessThenOrEqual(
              availableDaiBalance,
              amount.toBN(),
              () => amount.withValue(availableDaiBalance).toFormattedString(),
              tKeys.insufficientBalanceError.getKey(),
            );

      return { sourceAmount: amountError };
    },
    [availablePoolBalance.toString(), availableDaiBalance.toString()],
  );

  const handleFormSubmit = useCallback(
    ({ amount, repaymentMethod }: FormData) => {
      return amount ? api.loanModule.repay(account, debtId, amount, repaymentMethod) : undefined;
    },
    [account, debtId, api],
  );

  const [supportedTokens, supportedTokensMeta] = useSubscribable(
    () => api.fundsModule.getSupportedTokens$(),
    [api],
  );

  const getConfirmationMessage = useCallback(
    ({ amount }: FormData) => {
      return amount
        ? api.loanModule.getDebtRequiredPayments$(account, debtId, lastPaymentDate).pipe(
            map(({ currentInterest }) => {
              const body = max('0', amount.sub(currentInterest).toBN());
              const interest = min(amount.toBN(), currentInterest);

              return t(tKeys.confirmMessage.getKey(), {
                body: amount.withValue(body).toFormattedString(4),
                interest: amount.withValue(interest).toFormattedString(4),
                sourceAmount: amount.toFormattedString(4),
              });
            }),
          )
        : empty();
    },
    [api, account, debtId, lastPaymentDate],
  );

  return (
    <FormWithConfirmation<FormData>
      title={t(tKeys.formTitle.getKey())}
      initialValues={initialValues}
      getConfirmationMessage={getConfirmationMessage}
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
      validate={validateForm}
    >
      <Loading meta={[supportedTokensMeta, availablePoolBalanceMeta, availableDaiBalanceMeta]}>
        {supportedTokens && (
          <>
            <TokenAmountField
              name={fieldNames.amount}
              currencies={supportedTokens}
              placeholder={t(tKeys.placeholder.getKey())}
              validate={validateAmount}
              maxValue={maxValue}
            />
            <SpyField name="__" fieldValue={validateAmount} />
            <SpyField name="__" fieldValue={validateForm} />
          </>
        )}
      </Loading>
      <RadioGroupInputField name={fieldNames.repaymentMethod}>
        {repaymentMethods.map(value => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio color="primary" />}
            label={t(tKeys.fields.repaymentMethod[value].getKey())}
          />
        ))}
      </RadioGroupInputField>
    </FormWithConfirmation>
  );
}
