import React from 'react';

import { ButtonProps } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { UnstakingForm } from './UnstakingForm';

type IProps = ButtonProps & {
  loanSize: string;
  proposalId: string;
  borrower: string;
};

const tKeys = tKeysAll.features.unstake;

export function UnstakingButton(props: IProps) {
  const { loanSize, proposalId, borrower, ...restProps } = props;
  const { t } = useTranslate();

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
      {({ closeModal }) => (
        <WithAccount>
          {({ account }) => (
            <UnstakingForm
              account={account}
              loanSize={loanSize}
              proposalId={proposalId}
              borrower={borrower}
              onCancel={closeModal}
            />
          )}
        </WithAccount>
      )}
    </ModalButton>
  );
}
