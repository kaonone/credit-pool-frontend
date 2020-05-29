import React from 'react';
import { Observable, of } from 'rxjs';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ConfirmationDialog } from 'components';
import { useSubscribable } from 'utils/react';

import { ISubmittedFormData } from '../PTokenExchangingForm/PTokenExchangingForm';

interface IProps<T extends ISubmittedFormData> {
  isOpen: boolean;
  values: T | null;
  messageTKey: string | ((values: T) => Observable<string>);
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

function PTokenExchangingConfirmation<ExtraFormData extends ISubmittedFormData>(
  props: IProps<ExtraFormData>,
) {
  const { messageTKey, onCancel, onConfirm, values, isOpen } = props;

  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.exchangingConfirmation;

  const message =
    typeof messageTKey === 'string'
      ? t(messageTKey, { sourceAmount: values?.sourceAmount.toFormattedString() || '⏳' })
      : useSubscribable(() => (values ? messageTKey(values) : of('⏳')), [values], '⏳');

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      message={message}
      noText={t(tKeys.no.getKey())}
      yesText={t(tKeys.yes.getKey())}
      title={t(tKeys.title.getKey())}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}

export { PTokenExchangingConfirmation };
