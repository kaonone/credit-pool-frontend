import React, { useMemo, useCallback } from 'react';
import BN from 'bn.js';
import { Form, FormSpy } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import * as R from 'ramda';

import { Grid, Hint, Typography, Button, CircularProgress } from 'components';
import { DecimalsField } from 'components/form';
import {
  validateInteger,
  validatePositiveNumber,
  lessThenOrEqual,
  composeValidators,
  isRequired,
} from 'utils/validators';
import { formatBalance } from 'utils/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { TargetAmountField } from './TargetAmountField';

export interface IFormData {
  amount: string;
  targetAmount: null | BN;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  amount: 'amount',
  targetAmount: 'targetAmount',
};

export type Direction = 'buy' | 'sell';

interface IProps {
  direction: Direction;
  title: string;
  maxValue: BN;
  sourceSymbol: string;
  targetSymbol: string;
  placeholder: string;
  onSubmit: ({ givenAmount, receivedAmount }: { givenAmount: string; receivedAmount: BN }) => void;
  onCancel: () => void;
}

function PTokenExchangingForm(props: IProps) {
  const {
    direction,
    title,
    maxValue,
    sourceSymbol,
    targetSymbol,
    onSubmit,
    onCancel,
    placeholder,
  } = props;

  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashExchangeForm;

  const initialValues = useMemo<IFormData>(
    () => ({
      amount: '',
      targetAmount: null,
    }),
    [],
  );

  const formatValue = useCallback(
    (value: number | BN) => {
      return formatBalance({
        amountInBaseUnits: value as BN,
        baseDecimals: 0,
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
    (values: IFormData): { [FORM_ERROR]: string } | void => {
      if (!values.targetAmount) {
        return { [FORM_ERROR]: t(tKeys.targetAmountError.getKey()) };
      }

      onSubmit({ givenAmount: values.amount, receivedAmount: values.targetAmount });
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
                baseDecimals={0}
                baseUnitName={sourceSymbol}
                name={fieldNames.amount}
                placeholder={placeholder}
              />
            </Grid>
            <FormSpy subscription={{ values: true }}>
              {({ values }) => (
                <Grid item xs={12}>
                  <TargetAmountField
                    direction={direction}
                    sourceAmount={values.amount}
                    targetSymbol={targetSymbol}
                    spyFieldName={fieldNames.targetAmount}
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
