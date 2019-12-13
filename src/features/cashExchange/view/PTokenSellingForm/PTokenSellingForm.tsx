import React, { useCallback, useState } from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading } from 'components';

import { PTokenExchangingForm } from '../PTokenExchangingForm/PTokenExchangingForm';
import {
  PTokenExchangingConfirmation,
  Amounts,
} from '../PTokenExchangingConfirmation/PTokenExchangingConfirmation';

interface IProps {
  onCancel: () => void;
}

function PTokenSellingForm(props: IProps) {
  const { onCancel } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashSellingForm;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, [], null);
  const [amount, setAmount] = useState<Amounts | null>(null);

  const handlePTokenExchangingConfirmationClick = useCallback(async () => {
    if (!account) {
      throw new Error('You need to connect to Ethereum wallet');
    }
    await api.sellPtk$(account, new BN(amount?.givenAmount || 0));
    setAmount(null);
    onCancel();
  }, [onCancel, api, account, amount?.givenAmount]);

  const handlePTokenExchangingConfirmationCancel = useCallback(() => {
    setAmount(null);
  }, []);

  return (
    <Loading meta={accountMeta} progressVariant="circle">
      <PTokenExchangingForm
        direction="sell"
        title={t(tKeys.title.getKey())}
        maxValue={new BN(1000000000000000)}
        sourceSymbol="PTK"
        targetSymbol="DAI"
        placeholder={t(tKeys.placeholder.getKey())}
        onSubmit={setAmount}
        onCancel={onCancel}
      />
      <PTokenExchangingConfirmation
        isOpen={!!amount}
        sourceSymbol="PTK"
        targetSymbol="DAI"
        onConfirm={handlePTokenExchangingConfirmationClick}
        onCancel={handlePTokenExchangingConfirmationCancel}
        amounts={amount}
      />
    </Loading>
  );
}

export { PTokenSellingForm };
