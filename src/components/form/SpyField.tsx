import * as React from 'react';
import { FieldRenderProps, Field } from 'react-final-form';

import { useOnChangeState } from 'utils/react';

interface IOwnProps<T> {
  name: string;
  fieldValue: T; // final-form intercepts the 'value' property
  compare?: (prev: T, current: T) => boolean;
}

type Props<T> = FieldRenderProps<string, HTMLInputElement> & IOwnProps<T>;

function TextInput<T>(props: Props<T>) {
  const { input, fieldValue, compare } = props;
  const { onChange } = input;

  useOnChangeState(fieldValue, compare || defaultCompare, (_prev, current) => onChange(current));

  return <input {...input} type="hidden" />;
}

function SpyField<T>(props: IOwnProps<T>) {
  return <Field {...props} component={TextInput as any} />;
}

function defaultCompare<T>(prev: T, current: T) {
  return prev === current;
}

export { SpyField };
