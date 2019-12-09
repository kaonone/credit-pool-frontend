import React, { useMemo, useCallback } from 'react';
import BN from 'bn.js';
import { Form, FormSpy } from 'react-final-form';
import * as R from 'ramda';

import { DecimalsField } from 'components/form';
import { Grid, Hint, Typography, Button, CircularProgress } from 'components';
import {
  validateInteger,
  validatePositiveNumber,
  lessThenOrEqual,
  composeValidators,
} from 'utils/validators';
import { formatBalance } from 'utils/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

export interface IFormData {
  amount: string;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  amount: 'amount',
};

interface IProps {
  title: string;
  maxValue: BN;
  sourceSymbol: string;
  targetSymbol: string;
  placeholder: string;
  onSubmit: (values: IFormData) => void;
  onCancel: () => void;
  convertCash: (value: string) => string;
}

function CashExchangeForm(props: IProps) {
  const {
    title,
    maxValue,
    sourceSymbol,
    targetSymbol,
    onSubmit,
    onCancel,
    convertCash,
    placeholder,
  } = props;

  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashExchangeForm;

  const formatValue = (value: number | BN) => {
    return formatBalance({
      amountInBaseUnits: value as BN,
      baseDecimals: 0,
      tokenSymbol: targetSymbol,
    });
  };

  const validateAmount = useMemo(() => {
    return composeValidators(
      validateInteger,
      validatePositiveNumber,
      // eslint-disable-next-line no-underscore-dangle
      R.curry(lessThenOrEqual)(maxValue, R.__, formatValue),
    );
  }, [maxValue, validateInteger, validatePositiveNumber, R, targetSymbol]);

  const initialValues = useMemo<IFormData>(
    () => ({
      amount: '',
    }),
    [],
  );

  const renderCalculatedAmountMessage = useCallback(
    (value: string) => {
      const formattedAmount = formatBalance({
        amountInBaseUnits: convertCash(value),
        baseDecimals: 0,
        tokenSymbol: targetSymbol,
      });

      return t(tKeys.givenAmountText.getKey(), { formattedAmount });
    },
    [formatBalance, convertCash, targetSymbol],
  );

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      subscription={{ submitError: true, submitting: true }}
    >
      {({ handleSubmit, submitError, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" noWrap gutterBottom>
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
              {({ values }) =>
                (values.amount && (
                  <Grid item xs={12}>
                    <Hint>
                      <Typography>{renderCalculatedAmountMessage(values.amount)}</Typography>
                    </Hint>
                  </Grid>
                )) ||
                null
              }
            </FormSpy>
            {!!submitError && (
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

export { CashExchangeForm };
