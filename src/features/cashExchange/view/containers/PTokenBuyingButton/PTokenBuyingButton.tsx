import React, { useCallback } from 'react';
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

  const getMaxSourceValue = useCallback(
    (account: string) => api.tokens.getBalance$('dai', account),
    [],
  );

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
          sourcePlaceholder={t(tKeys.placeholder.getKey())}
          getMaxSourceValue={getMaxSourceValue}
          confirmMessageTKey={tKeys.confirmMessage.getKey()}
          onExchangeRequest={api.liquidityModule.buyPtk}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { PTokenBuyingButton };
