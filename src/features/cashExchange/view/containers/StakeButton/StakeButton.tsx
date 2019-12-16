import React from 'react';
import { GetProps } from '_helpers';
import BN from 'bn.js';
import Button from '@material-ui/core/Button';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = Omit<GetProps<typeof Button>, 'ref'>;

const tKeys = tKeysAll.features.cashExchange.stakeButton;

function StakeButton(props: IProps) {
  const { ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const confirmText = tKeys.confirmText.getKey();
  const calculatedAmountText = tKeys.calculatedAmountText.getKey();

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          maxValue={new BN(1000000000000000)}
          placeholder={t(tKeys.placeholder.getKey())}
          confirmText={confirmText}
          sourceSymbol="PTK"
          targetSymbol="DAI"
          direction="PtkToDai"
          apiMethod={api.stakePtk$}
          onCancel={closeModal}
          calculatedAmountText={calculatedAmountText}
        />
      )}
    </ModalButton>
  );
}

export { StakeButton };
