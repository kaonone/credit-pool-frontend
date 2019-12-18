import React, { useMemo } from 'react';
import BN from 'bn.js';
import Button from '@material-ui/core/Button';

import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { DecimalsField, TextInputField } from 'components/form';
import {
  isRequired,
  validateInteger,
  validatePositiveNumber,
  composeValidators,
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
    return composeValidators(isRequired, validateInteger, validatePositiveNumber);
  }, []);

  const initialValues = useMemo<IExtraFormData>(
    () => ({
      apr: '',
      description: '',
    }),
    [],
  );

  const additionalFields = [
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
  ];

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
          maxValue={new BN(1000000000000000)}
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
