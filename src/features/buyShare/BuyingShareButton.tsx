import React from 'react';

import { ButtonProps } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { BuyCashIcon } from 'components/icons';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { BuyingShareForm } from './BuyingShareForm';

type IProps = ButtonProps;

const tKeys = tKeysAll.features.buyShare;

export function BuyingShareButton(props: IProps) {
  const { t } = useTranslate();

  return (
    <ModalButton
      startIcon={<BuyCashIcon />}
      content={t(tKeys.buttonTitle.getKey())}
      fullWidth
      {...props}
    >
      {({ closeModal }) => (
        <WithAccount>
          {({ account }) => <BuyingShareForm account={account} onCancel={closeModal} />}
        </WithAccount>
      )}
    </ModalButton>
  );
}
