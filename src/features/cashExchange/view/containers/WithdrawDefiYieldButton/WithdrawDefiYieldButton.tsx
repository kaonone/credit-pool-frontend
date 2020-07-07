import React, { useCallback } from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ConfirmationDialog, Loading, Button, ButtonProps } from 'components';
import { useSubscribable } from 'utils/react';
import { zeroAddress } from 'utils/mock';

type IProps = ButtonProps;

const tKeysConfirmation = tKeysAll.features.cashExchange.exchangingConfirmation;
const tKeys = tKeysAll.features.cashExchange.withdrawDefiYieldButton;

function WithdrawDefiYieldButton(props: IProps) {
  const { t } = useTranslate();
  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const [defiYield, defiYieldMeta] = useSubscribable(
    () => api.defiModule.getAvailableInterest$(account || zeroAddress),
    [api, account],
  );

  const confirmMessage = t(tKeys.confirmMessage.getKey(), {
    amount: (defiYield && defiYield.toFormattedString()) || '⏳',
  });

  const handleActivate = useCallback(async (): Promise<void> => {
    if (!account) {
      throw new Error('User account address is not found');
    }
    await api.defiModule.withdrawInterest(account);
    close();
  }, [account]);

  return (
    <>
      <Loading meta={[accountMeta, defiYieldMeta]}>
        <Button {...props} onClick={open} disabled={defiYield?.isZero()}>
          {t(tKeys.buttonTitle.getKey())}
        </Button>
      </Loading>
      <ConfirmationDialog
        isOpen={isOpen}
        message={confirmMessage}
        noText={t(tKeysConfirmation.no.getKey())}
        yesText={t(tKeysConfirmation.yes.getKey())}
        title={t(tKeysConfirmation.title.getKey())}
        onCancel={close}
        onConfirm={handleActivate}
      />
    </>
  );
}

export { WithdrawDefiYieldButton };
