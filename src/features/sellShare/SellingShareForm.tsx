import React, { useCallback, useMemo } from 'react';
import { combineLatest, empty } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import BN from 'bn.js';

import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { TokenAmount } from 'model/entities';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useValidateAmount } from 'utils/react';
import { Loading } from 'components';

interface FormData {
  amount: TokenAmount | null;
}

interface SellingShareFormProps {
  account: string;
  onCancel(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

const initialValues: FormData = {
  amount: null,
};

const tKeys = tKeysAll.features.sellShare;

export function SellingShareForm({ onCancel, account }: SellingShareFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const maxValue = useMemo(() => api.fundsModule.getMaxWithdrawAmount$(account), [api, account]);
  const minValue = useMemo(
    () =>
      api.liquidityModule
        .getConfig$()
        .pipe(
          switchMap(({ pWithdrawMin }) =>
            api.fundsModule.getWithdrawingAmountAfterFee$(pWithdrawMin.toString()),
          ),
        ),
    [api],
  );

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue,
    minValue,
  });

  const handleFormSubmit = useCallback(
    ({ amount }: FormData) => {
      return amount ? api.liquidityModule.sellPtk(account, amount) : undefined;
    },
    [account, api],
  );

  const [supportedTokens, supportedTokensMeta] = useSubscribable(
    () => api.fundsModule.getSupportedTokens$(),
    [api],
  );

  const getConfirmationMessage = useCallback(
    ({ amount }: FormData) => {
      return amount
        ? combineLatest([
            api.fundsModule.getMaxWithdrawAmount$(account),
            api.fundsModule.getAvailableBalance$(account),
          ]).pipe(
            map(([maxWithdrawAmount, availableBalance]) => {
              const interestAmount = availableBalance.sub(maxWithdrawAmount);
              const fullAmount = amount.add(interestAmount.toBN());

              return (
                t(tKeys.confirmMessage.getKey(), { sourceAmount: amount.toFormattedString() }) +
                (interestAmount.gt(new BN(0))
                  ? t(tKeys.interestConfirmation.getKey(), {
                      interestAmount: interestAmount.toFormattedString(),
                      fullAmount: fullAmount.toFormattedString(),
                    })
                  : '')
              );
            }),
          )
        : empty();
    },
    [api, account],
  );

  return (
    <FormWithConfirmation<FormData>
      title={t(tKeys.formTitle.getKey())}
      initialValues={initialValues}
      getConfirmationMessage={getConfirmationMessage}
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
    >
      <Loading meta={supportedTokensMeta}>
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
          </>
        )}
      </Loading>
    </FormWithConfirmation>
  );
}
