import React, { useMemo, useCallback } from 'react';
import BN from 'bn.js';
import { Form, FormSpy } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Observable, empty } from 'rxjs';
import createDecorator, { Calculation } from 'final-form-calculate';

import { useTranslate, tKeys as tKeysAll, ITranslateKey } from 'services/i18n';
import { useApi } from 'services/api';
import { TokenAmountField, SpyField } from 'components/form';
import { Hint } from 'components/Hint/Hint';
import { Loading } from 'components/Loading';
import {
  validatePositiveNumber,
  lessThenOrEqual,
  isRequired,
  moreThen,
  moreThenOrEqual,
} from 'utils/validators';
import { useSubscribable } from 'utils/react';
import { TokenAmount, Token } from 'model/entities';
import { ETH_NETWORK_CONFIG } from 'env';

export interface IFormData {
  sourceAmount: TokenAmount | null;
  triggerRevalidateSourceAmount: (...args: any[]) => any;
}

export const fieldNames: { [K in keyof IFormData]: K } = {
  sourceAmount: 'sourceAmount',
  triggerRevalidateSourceAmount: 'triggerRevalidateSourceAmount',
};

export interface ISubmittedFormData {
  sourceAmount: TokenAmount;
}

export interface IProps<ExtraFormData extends Record<string, any> = {}> {
  account: string;
  title: string;
  isReadOnlySource?(values: ExtraFormData & IFormData): boolean;
  sourcePlaceholder: string;
  additionalFields?: React.ReactNode[];
  additionalInitialValues?: ExtraFormData;
  getMaxSourceValue: (options: { account: string; token: Token }) => Observable<BN>;
  getMinSourceValue: (options: { account: string; token: Token }) => Observable<BN>;
  onSubmit: (values: ISubmittedFormData & ExtraFormData) => void;
  onCancel: () => void;
  validateForm?(
    values: ExtraFormData & IFormData,
  ): { [key in keyof (ExtraFormData & IFormData)]?: ITranslateKey | null };
  formCalculations?: Calculation[];
}

function PTokenExchangingForm<ExtraFormData extends Record<string, any> = {}>(
  props: IProps<ExtraFormData>,
) {
  const {
    account,
    title,
    onSubmit,
    onCancel,
    isReadOnlySource,
    sourcePlaceholder,
    getMaxSourceValue,
    getMinSourceValue,
    additionalFields,
    additionalInitialValues = {} as ExtraFormData,
    validateForm,
    formCalculations,
  } = props;

  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.exchangingForm;

  const api = useApi();

  const decorators = useMemo(() => {
    return formCalculations ? [createDecorator(...formCalculations)] : undefined;
  }, [formCalculations]);

  const [sourceToken, sourceTokenMeta] = useSubscribable(
    () => api.tokens.getToken$(ETH_NETWORK_CONFIG.contracts.dai),
    [],
  );

  const [maxValue] = useSubscribable(
    () => (sourceToken ? getMaxSourceValue({ account, token: sourceToken }) : empty()),
    [getMaxSourceValue, account, sourceToken],
  );
  const [minValue] = useSubscribable(
    () => (sourceToken ? getMinSourceValue({ account, token: sourceToken }) : empty()),
    [getMinSourceValue, account, sourceToken],
  );

  const validateAmount = useMemo(() => {
    return (amount: '' | TokenAmount | null, allValues: Object) => {
      if (isReadOnlySource && isReadOnlySource(allValues as ExtraFormData & IFormData)) {
        return undefined;
      }
      if (!amount) {
        return isRequired(amount);
      }
      return (
        validatePositiveNumber(amount.value) ||
        moreThen(new BN(0), amount.value) ||
        (maxValue &&
          lessThenOrEqual(maxValue, amount.value, () =>
            amount.withValue(maxValue).toFormattedString(),
          )) ||
        (minValue &&
          moreThenOrEqual(minValue, amount.value, () =>
            amount.withValue(minValue).toFormattedString(),
          ))
      );
    };
  }, [maxValue?.toString(), minValue?.toString(), isReadOnlySource]);

  const initialValues = useMemo<IFormData & ExtraFormData>(
    () => ({
      sourceAmount: null,
      triggerRevalidateSourceAmount: validateAmount,
      ...additionalInitialValues,
    }),
    [],
  );

  const handleFormSubmit = useCallback(
    ({ sourceAmount, triggerRevalidateSourceAmount, ...restValues }: IFormData & ExtraFormData) => {
      if (!sourceAmount) {
        return { [fieldNames.sourceAmount]: isRequired(undefined) };
      }
      return onSubmit({
        sourceAmount,
        ...((restValues as unknown) as ExtraFormData),
      });
    },
    [onSubmit],
  );

  return (
    <Form
      decorators={decorators}
      validate={validateForm}
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

              <Loading meta={sourceTokenMeta}>
                {sourceToken && (
                  <FormSpy subscription={{ values: true }}>
                    {({ values }: { values: ExtraFormData & IFormData }) => (
                      <TokenAmountField
                        disabled={isReadOnlySource && isReadOnlySource(values)}
                        maxValue={maxValue}
                        validate={validateAmount}
                        token={sourceToken}
                        name={fieldNames.sourceAmount}
                        placeholder={sourcePlaceholder}
                      />
                    )}
                  </FormSpy>
                )}
              </Loading>
              <SpyField
                name={fieldNames.triggerRevalidateSourceAmount}
                fieldValue={validateAmount}
              />
            </Grid>
            {additionalFields?.map((item, index) => (
              <Grid key={index} item xs={12}>
                {item}
              </Grid>
            ))}
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
