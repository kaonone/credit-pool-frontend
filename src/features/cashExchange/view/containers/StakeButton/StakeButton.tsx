import React from 'react';
import BN from 'bn.js';
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

  const confirmText = tKeys.confirmText.getKey();
  const calculatedAmountText = tKeys.calculatedAmountText.getKey();

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...props}>
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          maxValue={new BN(1000000000000000)}
          sourcePlaceholder={t(tKeys.placeholder.getKey())}
          confirmMessageTKey={confirmText}
          sourceSymbol="PTK"
          targetSymbol="DAI"
          direction="PtkToDai"
          onExchangeRequest={api.stakePtk$}
          onCancel={closeModal}
          calculatedAmountTKey={calculatedAmountText}
        />
      )}
    </ModalButton>
  );
}

export { StakeButton };
