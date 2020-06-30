import React, { useCallback, useMemo, useState } from 'react';
import { map } from 'rxjs/operators';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';
import BN from 'bn.js';

import {
  FormWithConfirmation,
  TokenAmountField,
  FieldNames,
  SpyField,
  DecimalsField,
  TextInputField,
} from 'components/form';
import { TokenAmount, Token } from 'model/entities';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useValidateAmount } from 'utils/react';
import { Loading } from 'components';
import { roundWei } from 'utils/bn';
import {
  composeValidators,
  isRequired,
  validateInteger,
  moreThen,
  moreThenOrEqual,
  onEnglishPlease,
} from 'utils/validators';
import { formatBalance } from 'utils/format';

interface FormData {
  amount: TokenAmount | null;
  apr: string;
  description: string;
}

interface CreatingLoanProposalFormProps {
  account: string;
  onCancel(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
  apr: 'apr',
  description: 'description',
};

const initialValues: FormData = {
  amount: null,
  apr: '0',
  description: '',
};

const tKeys = tKeysAll.features.createLoanProposal;

const zero = new BN(0);

const validateDescription = composeValidators(isRequired, onEnglishPlease);

export function CreatingLoanProposalForm({ onCancel, account }: CreatingLoanProposalFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const maxValue$ = useMemo(
    () =>
      currentToken
        ? api.loanModule
            .getMaxAvailableLoanSizeInDai$(account)
            .pipe(map(loanSize => roundWei(loanSize, currentToken.decimals, 'floor', 2)))
        : empty(),
    [api, account, currentToken],
  );
  const minValue$ = useMemo(
    () => api.loanModule.getConfig$().pipe(map(({ limits: { lDebtAmountMin } }) => lDebtAmountMin)),
    [api],
  );
  const [minValue] = useSubscribable(() => minValue$, [minValue$]);

  const [percentDecimals, percentDecimalsMeta] = useSubscribable(
    () => api.loanModule.getAprDecimals$(),
    [api],
  );

  const [config] = useSubscribable(() => api.loanModule.getConfig$(), [api]);
  const minApr = config?.limits.debtInterestMin || zero;
  const formattedMinPercent = config
    ? `${formatBalance({
        amountInBaseUnits: minApr,
        baseDecimals: percentDecimals || 0,
        precision: 2,
      })}%`
    : '⏳';

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue: maxValue$,
    minValue: minValue$,
  });

  const validateApr = useMemo(() => {
    return composeValidators(
      isRequired,
      validateInteger,
      (value: string) => moreThen(new BN(0), new BN(value)),
      ...(!minApr.isZero()
        ? [(value: string) => moreThenOrEqual(minApr, new BN(value), () => formattedMinPercent)]
        : []),
    );
  }, [minApr, formattedMinPercent]);

  const handleFormChange = useCallback(
    ({ values: { amount } }: FormState<FormData>) => {
      if (!currentToken || !amount || !currentToken.equals(amount.currency)) {
        setCurrentToken(amount?.currency || null);
      }
    },
    [currentToken],
  );

  const handleFormSubmit = useCallback(
    ({ amount, apr, description }: FormData) => {
      return amount
        ? api.loanModule.createLoanProposal(account, { sourceAmount: amount, apr, description })
        : undefined;
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
        ? api.loanModule.getMinLoanCollateral$(amount).pipe(
            map(collateral => {
              return t(tKeys.confirmMessage.getKey(), {
                collateral: amount.withValue(collateral).toFormattedString(),
                sourceAmount: amount.toFormattedString(),
              });
            }),
          )
        : empty();
    },
    [account],
  );

  const amountPlaceholder = t(tKeys.amountPlaceholder.getKey(), {
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
              label={t(tKeys.amountLabel.getKey())}
              placeholder={amountPlaceholder}
              validate={validateAmount}
              maxValue={maxValue$}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
            <SpyField name="__" fieldValue={validateAmount} />
          </>
        )}
      </Loading>
      <Loading meta={percentDecimalsMeta}>
        {percentDecimals && (
          <>
            <DecimalsField
              validate={validateApr}
              baseDecimals={percentDecimals}
              name={fieldNames.apr}
              label={t(tKeys.percentLabel.getKey())}
              placeholder={t(tKeys.percentPlaceholder.getKey(), { percent: formattedMinPercent })}
              withSelect={false}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <SpyField name="__" fieldValue={validateApr} />
          </>
        )}
      </Loading>
      <TextInputField
        validate={validateDescription}
        name={fieldNames.description}
        label={t(tKeys.descriptionLabel.getKey())}
        placeholder={t(tKeys.descriptionPlaceholder.getKey())}
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormWithConfirmation>
  );
}
