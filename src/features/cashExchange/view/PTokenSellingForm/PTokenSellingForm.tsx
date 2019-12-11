import React, { useCallback, useState } from 'react';
import BN from 'bn.js';
import { FORM_ERROR } from 'final-form';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Dialog, DialogContent, Loading } from 'components';

import { PTokenExchangingForm, IFormData } from '../PTokenExchangingForm/PTokenExchangingForm';
import { PTokenExchangingConfirmation } from '../PTokenExchangingConfirmation/PTokenExchangingConfirmation';

interface IProps {
  onCancel: () => void;
}

function PTokenSellingForm(props: IProps) {
  const { onCancel } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashSellingForm;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, [], null);

  const [isOpen, setIsOpen] = useState(false);
  const [givenAmount, setGivenAmount] = useState('');
  const [receivedAmount, setReceivedAmount] = useState(new BN(0));

  const handlePTokenExchangingFormSubmit = useCallback(
    (values: IFormData): { [FORM_ERROR]: string } | void => {
      if (typeof values.targetAmount === 'undefined') {
        return { [FORM_ERROR]: t(tKeys.targetAmountError.getKey()) };
      }

      setIsOpen(true);
      setGivenAmount(values.amount);
      values.targetAmount && setReceivedAmount(values.targetAmount);
    },
    [setIsOpen, setGivenAmount, setReceivedAmount, FORM_ERROR, t],
  );

  const handlePTokenExchangingConfirmationClick = useCallback(async () => {
    account && (await api.sellPtk$(account, new BN(givenAmount)));
    // eslint-disable-next-line no-console
    console.log(`GivenAmount: ${givenAmount}, receivedAmount: ${receivedAmount}`);
    setIsOpen(false);
    onCancel();
  }, [setIsOpen, givenAmount, receivedAmount, onCancel, api, account]);

  const handlePTokenExchangingConfirmationCancel = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Loading meta={accountMeta} progressVariant="circle">
      <PTokenExchangingForm
        direction="sell"
        title={t(tKeys.title.getKey())}
        maxValue={new BN(1000000000000000)}
        sourceSymbol="PTK"
        targetSymbol="DAI"
        placeholder={t(tKeys.placeholder.getKey())}
        onSubmit={handlePTokenExchangingFormSubmit}
        onCancel={onCancel}
      />
      <Dialog fullWidth maxWidth="sm" open={isOpen}>
        <DialogContent>
          <PTokenExchangingConfirmation
            sourceSymbol="PTK"
            targetSymbol="DAI"
            onClick={handlePTokenExchangingConfirmationClick}
            onCancel={handlePTokenExchangingConfirmationCancel}
            givenAmount={givenAmount}
            receivedAmount={receivedAmount}
          />
        </DialogContent>
      </Dialog>
    </Loading>
  );
}

export { PTokenSellingForm };
