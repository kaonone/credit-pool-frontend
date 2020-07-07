import React from 'react';

import { ButtonProps } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { CreatingLoanProposalForm } from './CreatingLoanProposalForm';

type IProps = ButtonProps;

const tKeys = tKeysAll.features.createLoanProposal;

export function CreatingLoanProposalButton(props: IProps) {
  const { t } = useTranslate();

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...props}>
      {({ closeModal }) => (
        <WithAccount>
          {({ account }) => <CreatingLoanProposalForm account={account} onCancel={closeModal} />}
        </WithAccount>
      )}
    </ModalButton>
  );
}
