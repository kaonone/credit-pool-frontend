import React from 'react';
import { GetProps } from '_helpers';
import BN from 'bn.js';
import Button from '@material-ui/core/Button';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { BuyCashIcon } from 'components/icons';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { useApi } from 'services/api';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = Omit<GetProps<typeof Button>, 'ref'>;

const tKeys = tKeysAll.features.cashExchange.pTokenBuyingButton;

function PTokenBuyingButton(props: IProps) {
  const { ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  return (
    <ModalButton
      startIcon={<BuyCashIcon />}
      content={t(tKeys.buttonTitle.getKey())}
      fullWidth
      {...restProps}
    >
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          maxValue={new BN(1000000000000000)}
          placeholder={t(tKeys.placeholder.getKey())}
          sourceSymbol="DAI"
          targetSymbol="PTK"
          direction="DaiToPtk"
          apiMethod={api.buyPtk$}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { PTokenBuyingButton };
