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

function PTokenBuyingForm(props: IProps) {
  const { onCancel } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashBuyingForm;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, [], null);
  const [amounts, setAmounts] = useState<Amounts | null>(null);

  const handlePTokenExchangingConfirmationClick = useCallback(async () => {
    if (!account) {
      throw new Error('You need to connect to Ethereum wallet');
    }
    await api.buyPtk$(account, new BN(amounts?.givenAmount || 0));
    setAmounts(null);
    onCancel();
  }, [onCancel, api, account, amounts?.givenAmount]);

  const handlePTokenExchangingConfirmationCancel = useCallback(() => {
    setAmounts(null);
  }, []);

  return (
    <Loading meta={accountMeta} progressVariant="circle">
      <PTokenExchangingForm
        direction="buy"
        title={t(tKeys.title.getKey())}
        maxValue={new BN(1000000000000000)}
        sourceSymbol="DAI"
        targetSymbol="PTK"
        placeholder={t(tKeys.placeholder.getKey())}
        onSubmit={setAmounts}
        onCancel={onCancel}
      />
      <PTokenExchangingConfirmation
        isOpen={!!amounts}
        sourceSymbol="DAI"
        targetSymbol="PTK"
        onConfirm={handlePTokenExchangingConfirmationClick}
        onCancel={handlePTokenExchangingConfirmationCancel}
        amounts={amounts}
      />
    </Loading>
  );
}

export { PTokenBuyingForm };
