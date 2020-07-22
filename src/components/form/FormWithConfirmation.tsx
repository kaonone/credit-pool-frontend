import React, { useState, useCallback } from 'react';
import { Observable } from 'rxjs';

import { useSubscribable } from 'utils/react';
import { ConfirmationDialog } from 'components/ConfirmationDialog/ConfirmationDialog';
import { toObservable } from 'utils/rxjs';

import { FormTemplate, FormTemplateProps } from './FormTemplate';

type AnyObject = Record<string, any>;

export type FormWithConfirmationProps<FormData extends AnyObject> = Omit<
  FormTemplateProps<FormData>,
  never
> & {
  getConfirmationMessage: (values: FormData) => Observable<string> | string;
};

export function FormWithConfirmation<FormData extends AnyObject>(
  props: FormWithConfirmationProps<FormData>,
) {
  const { getConfirmationMessage, onSubmit, onCancel, ...restProps } = props;

  type SubmittingArgs = Parameters<typeof onSubmit>;
  const [submittingArgs, setArgs] = useState<SubmittingArgs | null>(null);
  const values = submittingArgs && submittingArgs[0];

  const handleSubmit = useCallback((...args: SubmittingArgs) => setArgs(args), []);

  const handleConfirmationClick = useCallback(async () => {
    if (!submittingArgs) {
      throw new Error('Submitting args is not found');
    }

    await onSubmit(...submittingArgs);

    setArgs(null);
    onCancel && onCancel();
  }, [onCancel, submittingArgs]);

  const handlePTokenExchangingConfirmationCancel = useCallback(() => {
    setArgs(null);
  }, []);

  const confirmationMessage = useSubscribable(
    () => toObservable(values ? getConfirmationMessage(values) : '⏳'),
    [values, getConfirmationMessage],
    '⏳',
  );

  return (
    <>
      <FormTemplate<FormData> {...restProps} onSubmit={handleSubmit} onCancel={onCancel} />
      <ConfirmationDialog
        isOpen={!!submittingArgs}
        message={confirmationMessage}
        noText="no"
        yesText="yes"
        title="Confirm action"
        onCancel={handlePTokenExchangingConfirmationCancel}
        onConfirm={handleConfirmationClick}
      />
    </>
  );
}
