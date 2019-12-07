import React, { useMemo, useCallback, useState } from 'react';
import BN from 'bn.js';
import { Form } from 'react-final-form';
import R from 'ramda';

import { Grid, Hint, Typography, Button, CircularProgress } from 'components';
import { DecimalsField } from 'components/form';
import {
  validateInteger,
  validatePositiveNumber,
  lessThenOrEqual,
  composeValidators,
} from 'utils/validators';
import { formatBalance } from 'utils/format';

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
  convertCash: (value: string) => string;
}

function CashExchangeForm(props: IProps) {
  const { title, maxValue, sourceSymbol, targetSymbol, onSubmit, convertCash, placeholder } = props;

  const validateAmount = useMemo(() => {
    return composeValidators(
      validateInteger,
      validatePositiveNumber,
      R.curry(lessThenOrEqual)(maxValue, R.__, formatBalance),
    );
  }, [maxValue]);

  const initialValues = useMemo<IFormData>(
    () => ({
      amount: '',
    }),
    [],
  );

  const [expectedConvertedAmount, setExpectedConvertedAmount] = useState('');

  const handleDecimalsFieldChange = useCallback((value: string) => {
    const formattedAmount = formatBalance({
      amountInBaseUnits: convertCash(value),
      baseDecimals: 0,
      tokenSymbol: targetSymbol,
    });
    setExpectedConvertedAmount(formattedAmount);
  }, []);

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
                onChange={handleDecimalsFieldChange}
              />
              <Hint>
                <Typography>{expectedConvertedAmount}</Typography>
              </Hint>
            </Grid>
            {!!submitError && (
              <Grid item xs={12}>
                <Hint>
                  <Typography color="error">{submitError}</Typography>
                </Hint>
              </Grid>
            )}
            <Grid item xs={12}>
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
