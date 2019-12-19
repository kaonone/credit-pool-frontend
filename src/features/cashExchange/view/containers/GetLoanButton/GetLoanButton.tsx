import React, { useMemo } from 'react';
import Button from '@material-ui/core/Button';
import * as R from 'ramda';
import BN from 'bn.js';

import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { DecimalsField, TextInputField } from 'components/form';
import {
  isRequired,
  validateInteger,
  composeValidators,
  moreThenOrEqual,
  moreThen,
} from 'utils/validators';
import { DEFAULT_PERCENT_DECIMALS } from 'env';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button>;

const tKeys = tKeysAll.features.cashExchange.getLoanButton;

interface IExtraFormData {
  apr: string;
  description: string;
}

const fieldNames: { [K in keyof IExtraFormData]: K } = {
  apr: 'apr',
  description: 'description',
};

function GetLoanButton(props: IProps) {
  const { t } = useTranslate();
  const api = useApi();

  const confirmText = tKeys.confirmText.getKey();
  const calculatedAmountText = tKeys.calculatedAmountText.getKey();

  const validatePercent = useMemo(() => {
    return composeValidators(
      isRequired,
      validateInteger,
      // eslint-disable-next-line no-underscore-dangle
      R.curry(moreThen)(new BN(0), R.__, undefined as any),
    );
  }, [R, moreThenOrEqual]);

  const initialValues = useMemo<IExtraFormData>(
    () => ({
      apr: '',
      description: '',
    }),
    [],
  );

  const additionalFields = useMemo(
    () => [
      <DecimalsField
        validate={validatePercent}
        baseDecimals={DEFAULT_PERCENT_DECIMALS}
        baseUnitName="%"
        name={fieldNames.apr}
        label={t(tKeys.percentLabel.getKey())}
        placeholder={t(tKeys.percentPlaceholder.getKey())}
        withSelect={false}
        InputLabelProps={{
          shrink: true,
        }}
      />,
      <TextInputField
        validate={isRequired}
        name={fieldNames.description}
        label={t(tKeys.descriptionLabel.getKey())}
        placeholder={t(tKeys.descriptionPlaceholder.getKey())}
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />,
    ],
    [t],
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
          sourceSymbol="DAI"
          targetSymbol="PTK"
          direction="DaiToLoanCollateral"
          onExchangeRequest={api.getLoan$}
          onCancel={closeModal}
          confirmMessageTKey={confirmText}
          calculatedAmountTKey={calculatedAmountText}
          additionalFields={additionalFields}
          initialValues={initialValues}
        />
      )}
    </ModalButton>
  );
}

export { GetLoanButton };
