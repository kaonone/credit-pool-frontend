import React, { useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import { of } from 'rxjs';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton, FormControlLabel, Radio, Loading } from 'components';
import { RadioGroupInputField, SpyField } from 'components/form';
import { useSubscribable } from 'utils/react';
import { max, min } from 'utils/bn';
import { RepaymentMethod, repaymentMethods } from 'model/types';
import { lessThenOrEqual } from 'utils/validators';
import { zeroAddress } from 'utils/mock';
import { TokenAmount } from 'model/entities';

import {
  PTokenExchanging,
  ISubmittedFormData,
  PTokenExchangingProps as GenericPTokenExchangingProps,
} from '../../components/PTokenExcahnging/PTokenExcahnging';

type PTokenExchangingProps = GenericPTokenExchangingProps<IExtraFormData>;

type IProps = React.ComponentPropsWithoutRef<typeof Button> & {
  debtId: string;
  lastPaymentDate: string;
  account: string;
};

const tKeys = tKeysAll.features.cashExchange.repayButton;

interface IExtraFormData {
  repaymentMethod: RepaymentMethod;
  triggerRevalidateForm: () => void;
}

const fieldNames: { [K in keyof IExtraFormData]: K } = {
  repaymentMethod: 'repaymentMethod',
  triggerRevalidateForm: 'triggerRevalidateForm',
};

function RepayButton(props: IProps) {
  const { debtId, account, lastPaymentDate, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const getConfirmMessage = useCallback(
    ({ sourceAmount }: ISubmittedFormData) => {
      const rawSourceAmount = sourceAmount.value;

      return api.loanModule.getDebtRequiredPayments$(account, debtId, lastPaymentDate).pipe(
        map(({ currentInterest }) => {
          const body = max('0', rawSourceAmount.sub(currentInterest));
          const interest = min(rawSourceAmount, currentInterest);

          return t(tKeys.confirmMessage.getKey(), {
            body: sourceAmount.withValue(body).toFormattedString(4),
            interest: sourceAmount.withValue(interest).toFormattedString(4),
            sourceAmount: sourceAmount.toFormattedString(4),
          });
        }),
      );
    },
    [account, debtId, lastPaymentDate],
  );

  const initialValues = useMemo<IExtraFormData>(
    () => ({
      repaymentMethod: 'fromOwnBalance',
      triggerRevalidateForm: () => undefined,
    }),
    [],
  );

  const getMaxSourceValue: PTokenExchangingProps['getMaxSourceValue'] = useCallback(
    () =>
      api.loanModule
        .getDebtRequiredPayments$(account, debtId, lastPaymentDate)
        .pipe(map(({ currentInterest, loanSize }) => currentInterest.add(loanSize))),
    [debtId, account, lastPaymentDate],
  );
  const getMinSourceValue: PTokenExchangingProps['getMinSourceValue'] = useCallback(
    () => of(new BN(0)),
    [],
  );

  const [availablePoolBalance, availablePoolBalanceMeta] = useSubscribable(
    () => api.fundsModule.getPtkBalanceInDaiWithFee$(account || zeroAddress),
    [account],
    new BN(0),
  );
  const [availableDaiBalance, availableDaiBalanceMeta] = useSubscribable(
    () => api.tokens.getDaiBalance$(account || zeroAddress),
    [account],
    new BN(0),
  );

  const validateForm = useCallback(
    ({ repaymentMethod, sourceAmount }: IExtraFormData & { sourceAmount: TokenAmount | null }) => {
      if (!sourceAmount) {
        return {};
      }

      const sourceAmountError =
        repaymentMethod === 'fromAvailablePoolBalance'
          ? lessThenOrEqual(
              availablePoolBalance,
              sourceAmount.value,
              () => sourceAmount.withValue(availablePoolBalance).toFormattedString(),
              tKeys.insufficientBalanceError.getKey(),
            )
          : lessThenOrEqual(
              availableDaiBalance,
              sourceAmount.value,
              () => sourceAmount.withValue(availableDaiBalance).toFormattedString(),
              tKeys.insufficientBalanceError.getKey(),
            );

      return { sourceAmount: sourceAmountError };
    },
    [availablePoolBalance.toString(), availableDaiBalance.toString()],
  );

  const onRepayRequest = useCallback(
    (address: string, values: { sourceAmount: TokenAmount } & IExtraFormData): Promise<void> => {
      return api.loanModule.repay(address, debtId, values.sourceAmount, values.repaymentMethod);
    },
    [debtId],
  );

  const additionalFields = useMemo(
    () => [
      <RadioGroupInputField name={fieldNames.repaymentMethod}>
        {repaymentMethods.map(value => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio color="primary" />}
            label={t(tKeys.fields.repaymentMethod[value].getKey())}
          />
        ))}
      </RadioGroupInputField>,
      <SpyField name={fieldNames.triggerRevalidateForm} fieldValue={validateForm} />,
    ],
    [validateForm],
  );

  return (
    <Loading meta={[availablePoolBalanceMeta, availableDaiBalanceMeta]}>
      <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
        {({ closeModal }) => (
          <PTokenExchanging<IExtraFormData>
            title={t(tKeys.formTitle.getKey())}
            sourcePlaceholder={t(tKeys.placeholder.getKey())}
            getMaxSourceValue={getMaxSourceValue}
            getMinSourceValue={getMinSourceValue}
            confirmMessageTKey={getConfirmMessage}
            onExchangeRequest={onRepayRequest}
            onCancel={closeModal}
            additionalFields={additionalFields}
            initialValues={initialValues}
            validateForm={validateForm}
          />
        )}
      </ModalButton>
    </Loading>
  );
}

export { RepayButton };
