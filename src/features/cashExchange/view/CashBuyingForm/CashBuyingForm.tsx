import React, { useCallback, useState } from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Dialog, DialogContent } from 'components';

import { CashExchangeForm, IFormData } from '../CashExchangeForm/CashExchangeForm';
import { ConfirmCashExchangeForm } from '../ConfirmCashExchangeForm/ConfirmCashExchangeForm';

interface IProps {
  onCancel: () => void;
}

function CashBuyingForm(props: IProps) {
  const { onCancel } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashBuyingForm;

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

  const handleConfirmCashExchangeFormClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log(`GivenAmount: ${givenAmount}, receivedAmount: ${receivedAmount}`);
    setIsOpen(false);
    onCancel();
  }, [setIsOpen, givenAmount, receivedAmount, onCancel]);

  const handleConfirmCashExchangeFormCancel = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <CashExchangeForm
        title={t(tKeys.title.getKey())}
        maxValue={new BN(1000000000000000)}
        sourceSymbol="DAI"
        targetSymbol="PTK"
        placeholder={t(tKeys.placeholder.getKey())}
        onSubmit={handleCashExchangeFormSubmit}
        onCancel={onCancel}
        convertCash={convertCash}
      />
      <Dialog fullWidth maxWidth="sm" open={isOpen}>
        <DialogContent>
          <ConfirmCashExchangeForm
            sourceSymbol="DAI"
            targetSymbol="PTK"
            onClick={handleConfirmCashExchangeFormClick}
            onCancel={handleConfirmCashExchangeFormCancel}
            givenAmount={givenAmount}
            receivedAmount={receivedAmount}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export { CashBuyingForm };
