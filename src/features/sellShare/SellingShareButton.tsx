import React from 'react';

import { ButtonProps } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { SellingShareForm } from './SellingShareForm';

type IProps = ButtonProps;

const tKeys = tKeysAll.features.sellShare;

export const SellingShareButton: React.FC<IProps> = ({ children, ...props }) => {
  const { t } = useTranslate();

  return (
    <ModalButton content={children || t(tKeys.buttonTitle.getKey())} {...props}>
      {({ closeModal }) => (
        <WithAccount>
          {({ account }) => <SellingShareForm account={account} onCancel={closeModal} />}
        </WithAccount>
      )}
    </ModalButton>
  );
};
