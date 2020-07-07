import React, { memo } from 'react';

import { ButtonProps } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { LoanRepayingForm } from './LoanRepayingForm';

type IProps = ButtonProps & {
  debtId: string;
  lastPaymentDate: string;
};

const tKeys = tKeysAll.features.repayLoan;

export const LoanRepayingButton = memo(function LoanRepayingButton({
  debtId,
  lastPaymentDate,
  ...restProps
}: IProps) {
  const { t } = useTranslate();

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
      {({ closeModal }) => (
        <WithAccount>
          {({ account }) => (
            <LoanRepayingForm
              account={account}
              debtId={debtId}
              lastPaymentDate={lastPaymentDate}
              onCancel={closeModal}
            />
          )}
        </WithAccount>
      )}
    </ModalButton>
  );
});
