import React, { useMemo, useCallback } from 'react';
import BN from 'bn.js';
import { Form, FormSpy } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { DecimalsField } from 'components/form';
import { Hint } from 'components/Hint/Hint';
import {
  validateInteger,
  validatePositiveNumber,
  lessThenOrEqual,
  composeValidators,
  isRequired,
} from 'utils/validators';
import { formatBalance } from 'utils/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { DEFAULT_DECIMALS } from 'env';

import { TargetAmountField } from './TargetAmountField';

export interface IFormData {
  sourceAmount: string;
  targetAmount: null | BN;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  sourceAmount: 'sourceAmount',
  targetAmount: 'targetAmount',
};

export type Direction = 'PtkToDai' | 'DaiToPtk' | 'DaiToLoanCollateral';

export interface ISubmittedFormData {
  sourceAmount: BN;
  targetAmount: BN;
}

interface IProps<ExtraFormData extends Record<string, any> = {}> {
  direction: Direction;
  title: string;
  maxValue: BN;
  sourceSymbol: string;
  targetSymbol: string;
  sourcePlaceholder: string;
  calculatedAmountTKey?: string;
  additionalFields?: React.ReactNode[];
  additionalInitialValues?: ExtraFormData;
  onSubmit: (values: ISubmittedFormData & Omit<ExtraFormData, keyof ISubmittedFormData>) => void;
  onCancel: () => void;
}

function PTokenExchangingForm<ExtraFormData extends Record<string, any> = {}>(
  props: IProps<ExtraFormData>,
) {
  const {
    direction,
    title,
    maxValue,
    sourceSymbol,
    targetSymbol,
    onSubmit,
    onCancel,
    sourcePlaceholder,
    calculatedAmountTKey,
    additionalFields,
    additionalInitialValues = {} as ExtraFormData,
  } = props;

  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.exchangingForm;

  const initialValues = useMemo<IFormData & ExtraFormData>(
    () => ({
      sourceAmount: '',
      targetAmount: null,
      ...additionalInitialValues,
    }),
    [],
  );

  const formatValue = useCallback(
    (value: number | BN) => {
      return formatBalance({
        amountInBaseUnits: value as BN,
        baseDecimals: DEFAULT_DECIMALS,
        tokenSymbol: targetSymbol,
      });
    },
    [targetSymbol],
  );

  const validateAmount = useMemo(() => {
    return composeValidators(
      isRequired,
      validateInteger,
      validatePositiveNumber,
      // eslint-disable-next-line no-underscore-dangle
      R.curry(lessThenOrEqual)(maxValue, R.__, formatValue),
    );
  }, [maxValue, targetSymbol, formatValue]);

  const handleFormSubmit = useCallback(
    ({
      sourceAmount,
      targetAmount,
      ...restValues
    }: IFormData & ExtraFormData): { [FORM_ERROR]: string } | void => {
      if (!targetAmount) {
        return { [FORM_ERROR]: t(tKeys.targetAmountError.getKey()) };
      }

      onSubmit({ sourceAmount: new BN(sourceAmount), targetAmount, ...restValues });
    },
    [onSubmit, FORM_ERROR, t],
  );

  return (
    <Form
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      subscription={{ submitError: true, submitting: true, dirtySinceLastSubmit: true }}
    >
      {({ handleSubmit, submitError, submitting, dirtySinceLastSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <DecimalsField
                maxValue={maxValue}
                validate={validateAmount}
                baseDecimals={DEFAULT_DECIMALS}
                baseUnitName={sourceSymbol}
                name={fieldNames.sourceAmount}
                placeholder={sourcePlaceholder}
              />
            </Grid>
            {additionalFields?.map((item, index) => (
              <Grid key={index} item xs={12}>
                {item}
              </Grid>
            ))}
            <FormSpy subscription={{ values: true }}>
              {({ values }) => (
                <Grid item xs={12}>
                  <TargetAmountField
                    direction={direction}
                    sourceAmount={values.sourceAmount}
                    targetSymbol={targetSymbol}
                    spyFieldName={fieldNames.targetAmount}
                    messageTKey={calculatedAmountTKey}
                  />
                </Grid>
              )}
            </FormSpy>
            {!dirtySinceLastSubmit && !!submitError && (
              <Grid item xs={12}>
                <Hint>
                  <Typography color="error">{submitError}</Typography>
                </Hint>
              </Grid>
            )}
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" fullWidth onClick={onCancel}>
                {t(tKeys.cancelButtonText.getKey())}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : 'submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

export { PTokenExchangingForm };
