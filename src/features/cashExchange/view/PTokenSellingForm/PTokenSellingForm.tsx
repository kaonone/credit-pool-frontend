import React, { useCallback, useState } from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable, useCommunication } from 'utils/react';
import { Dialog, DialogContent, Loading } from 'components';

import { PTokenExchangingForm } from '../PTokenExchangingForm/PTokenExchangingForm';
import {
  PTokenExchangingConfirmation,
  Amount,
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
  const [amount, setAmount] = useState<Amount | null>(null);

  const handlePTokenExchangingConfirmationClick = useCallback(async () => {
    account && (await api.sellPtk$(account, new BN(amount?.givenAmount || 0)));
    setAmount(null);
    onCancel();
  }, [onCancel, api, account, amount]);

  const communication = useCommunication(handlePTokenExchangingConfirmationClick, []);

  const handlePTokenExchangingConfirmationCancel = useCallback(() => {
    setAmount(null);
  }, [setAmount]);

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
      <Dialog fullWidth maxWidth="sm" open={!!amount}>
        <DialogContent>
          <PTokenExchangingConfirmation
            sourceSymbol="PTK"
            targetSymbol="DAI"
            onCancel={handlePTokenExchangingConfirmationCancel}
            amount={amount}
            communication={communication}
          />
        </DialogContent>
      </Dialog>
    </Loading>
  );
}

export { PTokenSellingForm };
