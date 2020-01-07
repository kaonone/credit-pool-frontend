import React from 'react';
import Button from '@material-ui/core/Button';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button>;

const tKeys = tKeysAll.features.cashExchange.stakeButton;

function StakeButton(props: IProps) {
  const { t } = useTranslate();
  const api = useApi();

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...props}>
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          sourcePlaceholder={t(tKeys.placeholder.getKey())}
          direction="PtkToDai"
          confirmMessageTKey={tKeys.confirmMessage.getKey()}
          onExchangeRequest={api.stakePtk$}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { StakeButton };
