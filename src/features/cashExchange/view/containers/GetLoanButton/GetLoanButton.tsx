import React, { useMemo, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import * as R from 'ramda';
import BN from 'bn.js';
import { map } from 'rxjs/operators';

import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { Loading } from 'components/Loading';
import { DecimalsField, TextInputField } from 'components/form';
import { isRequired, validateInteger, composeValidators, moreThen } from 'utils/validators';
import { formatBalance } from 'utils/format';

import {
  PTokenExchanging,
  ISubmittedFormData,
} from '../../components/PTokenExcahnging/PTokenExcahnging';

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

  const [percentDecimals, percentDecimalsMeta] = useSubscribable(
    () => api.getInterestPercentDecimals$(),
    [],
  );

  const validatePercent = useMemo(() => {
    return composeValidators(
      isRequired,
      validateInteger,
      // eslint-disable-next-line no-underscore-dangle
      R.curry(moreThen)(new BN(0), R.__, undefined as any),
    );
  }, []);

  const initialValues = useMemo<IExtraFormData>(
    () => ({
      apr: '',
      description: '',
    }),
    [],
  );

  const [daiTokenInfo] = useSubscribable(() => api.getTokenInfo$('dai'), []);

  const getConfirmMessage = useCallback(
    (values: (ISubmittedFormData & IExtraFormData) | null) => {
      const rawSourceAmount = values?.sourceAmount?.toString() || '0';

      return api.getMinLoanCollateralByDaiInDai$(rawSourceAmount).pipe(
        map(rawCollateral => {
          const collateral =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: rawCollateral,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
              })) ||
            '⏳';

          const sourceAmount =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: rawSourceAmount,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
              })) ||
            '⏳';

          return t(tKeys.confirmMessage.getKey(), { collateral, sourceAmount });
        }),
      );
    },
    [daiTokenInfo],
  );

  const additionalFields = useMemo(
    () => [
      <Loading meta={percentDecimalsMeta}>
        {percentDecimals && (
          <DecimalsField
            validate={validatePercent}
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
        )}
      </Loading>,
      <Loading meta={percentDecimalsMeta}>
        {percentDecimals && (
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
          />
        )}
      </Loading>,
    ],
    [t, percentDecimals],
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
          direction="DaiToLoanCollateral"
          onExchangeRequest={api.createLoanProposal}
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
