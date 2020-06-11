import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { useTranslate } from 'services/i18n';
import { getFieldWithComponent } from 'utils/react';

import { LiquidityAmountInput, LiquidityAmountInputProps } from '../inputs';

type IProps = Omit<LiquidityAmountInputProps, 'onChange' | 'value' | 'helperText'> &
  FieldRenderProps<LiquidityAmountInputProps['value'], HTMLElement>;

function LiquidityAmountFieldComponent(props: IProps) {
  const { input, meta, ...rest } = props;
  const { t } = useTranslate();

  const error =
    typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);

  return <LiquidityAmountInput {...rest} helperText={error} error={Boolean(error)} {...input} />;
}

export const LiquidityAmountField = getFieldWithComponent(LiquidityAmountFieldComponent);
