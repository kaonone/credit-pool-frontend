import React, { useCallback, useMemo } from 'react';
import { combineLatest, empty } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormWithConfirmation, LiquidityAmountField, FieldNames, SpyField } from 'components/form';
import { LiquidityAmount } from 'model/entities';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useValidateAmount } from 'utils/react';
import { Loading, Typography, Box } from 'components';
import { roundWei, min } from 'utils/bn';
import { calcInterestShare } from 'model';
import { formatBalance } from 'utils/format';

import { AmountPrefiller } from './AmountPrefiller';

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

const tKeys = tKeysAll.features.giveStake;

export function GivingStakeForm({
  onCancel,
  account,
  borrower,
  loanSize,
  proposalId,
}: GivingStakeFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const [liquidityCurrency, liquidityCurrencyMeta] = useSubscribable(
    () => api.fundsModule.getLiquidityCurrency$(),
    [api],
  );

  const maxValue$ = useMemo(
    () =>
      combineLatest([
        api.fundsModule.getPtkBalanceInDaiWithoutFee$(account),
        api.loanModule.getPledgeRequirements$(borrower, proposalId),
      ]).pipe(
        map(([balance, { maxLPledge }]) => {
          const { currency } = maxLPledge;
          const roundedBalance = roundWei(balance, currency.decimals, 'floor', 2);
          const roundedMaxStakeSize = roundWei(maxLPledge.toBN(), currency.decimals, 'ceil', 2);

          return maxLPledge.withValue(min(roundedBalance, roundedMaxStakeSize));
        }),
      ),
    [api, account, borrower, proposalId],
  );
  const minValue$ = useMemo(
    () =>
      api.loanModule
        .getPledgeRequirements$(borrower, proposalId)
        .pipe(map(({ minLPledge }) => minLPledge)),
    [api, borrower, proposalId],
  );
  const [minValue] = useSubscribable(() => minValue$, [minValue$]);

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue: maxValue$,
    minValue: minValue$,
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

  const amountPlaceholder = t(tKeys.placeholder.getKey(), {
    amount:
      liquidityCurrency && minValue
        ? new LiquidityAmount(minValue, liquidityCurrency).toFormattedString()
        : '⏳',
  });

  return (
    <FormWithConfirmation<FormData>
      title={t(tKeys.formTitle.getKey())}
      initialValues={initialValues}
      getConfirmationMessage={getConfirmationMessage}
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
    >
      <Typography>{t(tKeys.description.getKey())}</Typography>
      <Loading meta={liquidityCurrencyMeta}>
        {liquidityCurrency && (
          <>
            <LiquidityAmountField
              name={fieldNames.amount}
              currencies={[liquidityCurrency]}
              placeholder={amountPlaceholder}
              validate={validateAmount}
              maxValue={maxValue$}
            />
            <Box mt={0.5}>
              <AmountPrefiller
                fieldName={fieldNames.amount}
                loanSize={loanSize}
                maxValue$={maxValue$}
                minValue$={minValue$}
              />
            </Box>
            <SpyField name="__" fieldValue={validateAmount} />
          </>
        )}
      </Loading>
    </FormWithConfirmation>
  );
}
