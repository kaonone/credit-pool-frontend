import React, { useCallback, useState } from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Dialog, DialogContent } from 'components';

import { CashExchangeForm, IFormData } from '../CashExchangeForm/CashExchangeForm';
import { ConfirmCashExchangeForm } from '../ConfirmCashExchangeForm/ConfirmCashExchangeForm';

interface IProps {
  onCancel: () => void;
}

function CashSellingForm(props: IProps) {
  const { onCancel } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashSellingForm;

  const convertCash = useCallback((value: string) => {
    return value;
  }, []);

  const [isOpened, setIsOpened] = useState(false);
  const [givenAmount, setGivenAmount] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');

  const handleCashExchangeFormSubmit = useCallback(
    (values: IFormData) => {
      setIsOpened(true);
      setGivenAmount(values.amount);
      setReceivedAmount(convertCash(values.amount));
    },
    [setIsOpened, setGivenAmount, setReceivedAmount, convertCash],
  );

  const handleConfirmCashExchangeFormClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log(`GivenAmount: ${givenAmount}, receivedAmount: ${receivedAmount}`);
    setIsOpened(false);
    onCancel();
  }, [setIsOpened, givenAmount, receivedAmount, onCancel]);

  const handleConfirmCashExchangeFormCancel = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <>
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
      <Dialog fullWidth maxWidth="sm" open={isOpened}>
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
    </>
  );
}

export { CashSellingForm };
