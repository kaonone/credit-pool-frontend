import React, { useCallback, useMemo, useState } from 'react';
import { map } from 'rxjs/operators';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';

import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { TokenAmount, Token } from 'model/entities';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useValidateAmount } from 'utils/react';
import { Loading } from 'components';

interface FormData {
  amount: TokenAmount | null;
}

interface BuyingShareFormProps {
  account: string;
  onCancel(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

const initialValues: FormData = {
  amount: null,
};

const tKeys = tKeysAll.features.buyShare;

export function BuyingShareForm({ onCancel, account }: BuyingShareFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const [supportedTokens, supportedTokensMeta] = useSubscribable(
    () => api.fundsModule.getSupportedTokens$(),
    [api],
  );

  const maxValue$ = useMemo(
    () => (currentToken ? api.erc20.getBalance$(currentToken.address, account) : empty()),
    [api, account, currentToken],
  );
  const minValue$ = useMemo(
    () => api.liquidityModule.getConfig$().pipe(map(({ lDepositMin }) => lDepositMin)),
    [api],
  );
  const [minValue] = useSubscribable(() => minValue$, [minValue$]);

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue: maxValue$,
    minValue: minValue$,
  });

  const handleFormChange = useCallback(
    ({ values: { amount } }: FormState<FormData>) => {
      if (!currentToken || !amount || !currentToken.equals(amount.currency)) {
        setCurrentToken(amount?.currency || null);
      }
    },
    [currentToken],
  );

  const handleFormSubmit = useCallback(
    ({ amount }: FormData) => {
      return amount ? api.liquidityModule.buyPtk(account, amount) : undefined;
    },
    [account, api],
  );

  const getConfirmationMessage = useCallback(
    ({ amount }: FormData) => {
      return t(tKeys.confirmMessage.getKey(), {
        sourceAmount: amount ? amount.toFormattedString() : '⏳',
      });
    },
    [account],
  );

  const amountPlaceholder = t(tKeys.placeholder.getKey(), {
    amount:
      currentToken && minValue ? new TokenAmount(minValue, currentToken).toFormattedString() : '⏳',
  });

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
              placeholder={amountPlaceholder}
              validate={validateAmount}
              maxValue={maxValue$}
            />
            <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
            <SpyField name="__" fieldValue={validateAmount} />
          </>
        )}
      </Loading>
    </FormWithConfirmation>
  );
}
