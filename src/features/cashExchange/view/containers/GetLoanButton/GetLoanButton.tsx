import React, { useMemo, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import BN from 'bn.js';
import { map } from 'rxjs/operators';

import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { Loading } from 'components/Loading';
import { DecimalsField, TextInputField, SpyField } from 'components/form';
import {
  isRequired,
  validateInteger,
  composeValidators,
  moreThen,
  onEnglishPlease,
  moreThenOrEqual,
  Validator,
} from 'utils/validators';
import { formatBalance } from 'utils/format';
import { roundWei } from 'utils/bn';

import {
  PTokenExchanging,
  ISubmittedFormData,
  PTokenExchangingProps as GenericPTokenExchangingProps,
} from '../../components/PTokenExcahnging/PTokenExcahnging';

type PTokenExchangingProps = GenericPTokenExchangingProps<IExtraFormData>;

type Props = React.ComponentPropsWithoutRef<typeof Button>;

const tKeys = tKeysAll.features.cashExchange.getLoanButton;

interface IExtraFormData {
  apr: string;
  description: string;
  triggerRevalidateApr: Validator;
}

const fieldNames: { [K in keyof IExtraFormData]: K } = {
  apr: 'apr',
  description: 'description',
  triggerRevalidateApr: 'triggerRevalidateApr',
};

const zero = new BN(0);

function GetLoanButton(props: Props) {
  const { t } = useTranslate();
  const api = useApi();

  const getMaxSourceValue: PTokenExchangingProps['getMaxSourceValue'] = useCallback(
    ({ account, token }) =>
      api.loanModule
        .getMaxAvailableLoanSizeInDai$(account)
        .pipe(map(loanSize => roundWei(loanSize, token.decimals, 'floor', 2))),
    [],
  );
  const getMinSourceValue: PTokenExchangingProps['getMinSourceValue'] = useCallback(
    () => api.loanModule.getConfig$().pipe(map(({ limits: { lDebtAmountMin } }) => lDebtAmountMin)),
    [],
  );

  const [percentDecimals, percentDecimalsMeta] = useSubscribable(
    () => api.loanModule.getAprDecimals$(),
    [],
  );

  const [config] = useSubscribable(() => api.loanModule.getConfig$(), []);
  const minApr = config?.limits.debtInterestMin || zero;
  const formattedMinPercent = formatBalance({
    amountInBaseUnits: minApr,
    baseDecimals: percentDecimals || 0,
    precision: 2,
  });

  const validateApr = useMemo(() => {
    return composeValidators(
      isRequired,
      validateInteger,
      (value: string) => moreThen(new BN(0), new BN(value)),
      ...(!minApr.isZero()
        ? [
            (value: string) =>
              moreThenOrEqual(minApr, new BN(value), () => `${formattedMinPercent}%`),
          ]
        : []),
    );
  }, [minApr, formattedMinPercent]);

  const validateDescription = useMemo(() => {
    return composeValidators(isRequired, onEnglishPlease);
  }, []);

  const initialValues = useMemo<IExtraFormData>(
    () => ({
      apr: '',
      description: '',
      triggerRevalidateApr: validateApr,
    }),
    [],
  );

  const getConfirmMessage = useCallback(
    ({ sourceAmount }: ISubmittedFormData & IExtraFormData) => {
      return api.loanModule.getMinLoanCollateralByDaiInDai$(sourceAmount.toString()).pipe(
        map(collateral => {
          return t(tKeys.confirmMessage.getKey(), {
            collateral: sourceAmount.withValue(collateral).toFormattedString(),
            sourceAmount: sourceAmount.toFormattedString(),
          });
        }),
      );
    },
    [api],
  );

  const additionalFields = useMemo(
    () => [
      <Loading meta={percentDecimalsMeta}>
        {percentDecimals && (
          <>
            <DecimalsField
              validate={validateApr}
              baseDecimals={percentDecimals}
              baseUnitName="%"
              name={fieldNames.apr}
              label={t(tKeys.percentLabel.getKey())}
              placeholder={t(tKeys.percentPlaceholder.getKey())}
              withSelect={false}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <SpyField name={fieldNames.triggerRevalidateApr} fieldValue={validateApr} />
          </>
        )}
      </Loading>,
      <Loading meta={percentDecimalsMeta}>
        {percentDecimals && (
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
        )}
      </Loading>,
    ],
    [t, percentDecimals, validateApr],
  );

  return (
    <ModalButton
      content={t(tKeys.buttonTitle.getKey())}
      variant="contained"
      color="primary"
      fullWidth
      {...props}
    >
      {({ closeModal }) => (
        <PTokenExchanging<IExtraFormData>
          title={t(tKeys.formTitle.getKey())}
          sourcePlaceholder={t(tKeys.amountPlaceholder.getKey())}
          getMaxSourceValue={getMaxSourceValue}
          getMinSourceValue={getMinSourceValue}
          onExchangeRequest={api.loanModule.createLoanProposal}
          onCancel={closeModal}
          confirmMessageTKey={getConfirmMessage}
          additionalFields={additionalFields}
          initialValues={initialValues}
        />
      )}
    </ModalButton>
  );
}

export { GetLoanButton };
