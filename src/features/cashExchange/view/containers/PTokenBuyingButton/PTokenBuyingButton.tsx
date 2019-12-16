import React from 'react';
import BN from 'bn.js';
import Button from '@material-ui/core/Button';

import { useApi } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { BuyCashIcon } from 'components/icons';
import { ModalButton } from 'components/ModalButton/ModalButton';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button>;

const tKeys = tKeysAll.features.cashExchange.pTokenBuyingButton;

function PTokenBuyingButton(props: IProps) {
  const { t } = useTranslate();
  const api = useApi();

  return (
    <ModalButton
      startIcon={<BuyCashIcon />}
      content={t(tKeys.buttonTitle.getKey())}
      fullWidth
      {...props}
    >
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          maxValue={new BN(1000000000000000)}
          sourcePlaceholder={t(tKeys.placeholder.getKey())}
          sourceSymbol="DAI"
          targetSymbol="PTK"
          direction="DaiToPtk"
          onExchangeRequest={api.buyPtk$}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { PTokenBuyingButton };
