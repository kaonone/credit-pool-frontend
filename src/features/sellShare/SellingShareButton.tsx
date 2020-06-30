import React from 'react';
import Button from '@material-ui/core/Button';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { SellCashIcon } from 'components/icons';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { WithAccount } from 'app/components/WithAccount/WithAccount';

import { SellingShareForm } from './SellingShareForm';

type IProps = React.ComponentPropsWithoutRef<typeof Button>;

const tKeys = tKeysAll.features.sellShare;

export function SellingShareButton(props: IProps) {
  const { t } = useTranslate();

  return (
    <ModalButton
      startIcon={<SellCashIcon />}
      content={t(tKeys.buttonTitle.getKey())}
      fullWidth
      {...props}
    >
      {({ closeModal }) => (
        <WithAccount>
          {({ account }) => <SellingShareForm account={account} onCancel={closeModal} />}
        </WithAccount>
      )}
    </ModalButton>
  );
}
