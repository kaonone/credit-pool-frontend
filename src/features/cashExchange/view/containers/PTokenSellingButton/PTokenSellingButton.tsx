import React from 'react';
import { GetProps } from '_helpers';
import BN from 'bn.js';
import Button from '@material-ui/core/Button';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { SellCashIcon } from 'components/icons';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { useApi } from 'services/api';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = Omit<GetProps<typeof Button>, 'ref'>;

const tKeys = tKeysAll.features.cashExchange.pTokenSellingButton;

function PTokenSellingButton(props: IProps) {
  const { ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  return (
    <ModalButton
      startIcon={<SellCashIcon />}
      content={t(tKeys.buttonTitle.getKey())}
      fullWidth
      {...restProps}
    >
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          maxValue={new BN(1000000000000000)}
          placeholder={t(tKeys.placeholder.getKey())}
          sourceSymbol="PTK"
          targetSymbol="DAI"
          direction="PtkToDai"
          apiMethod={api.sellPtk$}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { PTokenSellingButton };
