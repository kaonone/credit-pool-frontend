import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { useTranslate } from 'services/i18n';
import { getFieldWithComponent } from 'utils/react';
import { DatePicker } from 'elements';

type IProps = GetProps<typeof DatePicker> & FieldRenderProps<any, HTMLElement>;

function DatePickerFieldComponent(props: IProps) {
  const { input, meta, ...rest } = props;
  const { t } = useTranslate();
  const error =
    typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);
  return <DatePicker {...rest} helperText={error} error={Boolean(error)} {...input} />;
}

export const DatePickerField = getFieldWithComponent(DatePickerFieldComponent);
