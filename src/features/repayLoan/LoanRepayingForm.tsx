import React, { useCallback, useMemo, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';

import { ETH_NETWORK_CONFIG } from 'env';
import { Loading, Grid } from 'components';
import { RadioButton } from 'components/inputs';
import {
  FormWithConfirmation,
  FieldNames,
  SpyField,
  RadioGroupInputField,
  TokenAmountField,
} from 'components/form';
import { RepaymentMethod, repaymentMethods } from 'model/types';
import { TokenAmount, Token } from 'model/entities';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useValidateAmount } from 'utils/react';
import { lessThenOrEqual } from 'utils/validators';
import { zeroAddress } from 'utils/mock';
import { max, min } from 'utils/bn';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';

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

  const [currentToken, setCurrentToken] = useState<Token | null>(null);
  const [currentRepaymentMethod, setCurrentRepaymentMethod] = useState<RepaymentMethod | null>(
    null,
  );

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

  const handleFormChange = useCallback(
    ({ values: { amount, repaymentMethod } }: FormState<FormData>) => {
      if (!currentToken || !amount || !currentToken.equals(amount.currency)) {
        setCurrentToken(amount?.currency || null);
      }
      setCurrentRepaymentMethod(repaymentMethod);
    },
    [currentToken],
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TokenAmountField
                  name={fieldNames.amount}
                  currencies={supportedTokens}
                  placeholder={t(tKeys.placeholder.getKey())}
                  validate={validateAmount}
                  maxValue={maxValue}
                />
              </Grid>
              <Grid item xs={6}>
                <RadioGroupInputField name={fieldNames.repaymentMethod}>
                  {repaymentMethods.map(value => (
                    <RadioButton
                      key={value}
                      value={value}
                      label={t(tKeys.fields.repaymentMethod[value].getKey())}
                    />
                  ))}
                </RadioGroupInputField>
              </Grid>
              {currentToken && currentRepaymentMethod === 'fromOwnBalance' && (
                <Grid item xs={6} container justify="flex-end" alignItems="flex-start">
                  <InfiniteApproveSwitch
                    spender={ETH_NETWORK_CONFIG.contracts.fundsModule}
                    tokens={currentToken}
                  />
                </Grid>
              )}
            </Grid>
            <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
            <SpyField name="__" fieldValue={validateAmount} />
            <SpyField name="__" fieldValue={validateForm} />
          </>
        )}
      </Loading>
    </FormWithConfirmation>
  );
}
