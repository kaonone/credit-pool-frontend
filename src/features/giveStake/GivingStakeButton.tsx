import React from 'react';

import { ButtonProps } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { GivingStakeForm } from './GivingStakeForm';

type IProps = ButtonProps & {
  loanSize: string;
  proposalId: string;
  borrower: string;
};

const tKeys = tKeysAll.features.giveStake;

export function GivingStakeButton(props: IProps) {
  const { loanSize, proposalId, borrower, ...restProps } = props;
  const { t } = useTranslate();

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
      {({ closeModal }) => (
        <WithAccount>
          {({ account }) => (
            <GivingStakeForm
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
