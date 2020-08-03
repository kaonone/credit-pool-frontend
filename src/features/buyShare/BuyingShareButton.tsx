import React from 'react';

import { ButtonProps } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { BuyingShareForm } from './BuyingShareForm';

type IProps = ButtonProps & { note?: string };

const tKeys = tKeysAll.features.buyShare;

export const BuyingShareButton: React.FC<IProps> = ({ children, note, ...props }) => {
  const { t } = useTranslate();

  return (
    <ModalButton content={children || t(tKeys.buttonTitle.getKey())} {...props}>
      {({ closeModal }) => (
        <WithAccount>
          {({ account }) => <BuyingShareForm account={account} note={note} onCancel={closeModal} />}
        </WithAccount>
      )}
    </ModalButton>
  );
};
