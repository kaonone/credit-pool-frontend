import React, { useCallback, useState } from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Dialog, DialogContent, Loading } from 'components';

import { CashExchangeForm, IFormData } from '../CashExchangeForm/CashExchangeForm';
import { ConfirmCashExchangeForm } from '../ConfirmCashExchangeForm/ConfirmCashExchangeForm';

interface IProps {
  onCancel: () => void;
}

function CashSellingForm(props: IProps) {
  const { onCancel } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashSellingForm;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, [], null);

  const convertCash = useCallback((value: string) => {
    return value;
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [givenAmount, setGivenAmount] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');

  const handleCashExchangeFormSubmit = useCallback(
    (values: IFormData) => {
      setIsOpen(true);
      setGivenAmount(values.amount);
      setReceivedAmount(convertCash(values.amount));
    },
    [setIsOpen, setGivenAmount, setReceivedAmount, convertCash],
  );

  const handleConfirmCashExchangeFormClick = useCallback(async () => {
    account && (await api.sellPtk$(account, new BN(givenAmount)));
    // eslint-disable-next-line no-console
    console.log(`GivenAmount: ${givenAmount}, receivedAmount: ${receivedAmount}`);
    setIsOpen(false);
    onCancel();
  }, [setIsOpen, givenAmount, receivedAmount, onCancel, api, account]);

  const handleConfirmCashExchangeFormCancel = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Loading meta={accountMeta} progressVariant="circle">
      <CashExchangeForm
        title={t(tKeys.title.getKey())}
        maxValue={new BN(1000000000000000)}
        sourceSymbol="PTK"
        targetSymbol="DAI"
        placeholder={t(tKeys.placeholder.getKey())}
        onSubmit={handleCashExchangeFormSubmit}
        onCancel={onCancel}
        convertCash={convertCash}
      />
      <Dialog fullWidth maxWidth="sm" open={isOpen}>
        <DialogContent>
          <ConfirmCashExchangeForm
            sourceSymbol="PTK"
            targetSymbol="DAI"
            onClick={handleConfirmCashExchangeFormClick}
            onCancel={handleConfirmCashExchangeFormCancel}
            givenAmount={givenAmount}
            receivedAmount={receivedAmount}
          />
        </DialogContent>
      </Dialog>
    </Loading>
  );
}

export { CashSellingForm };
