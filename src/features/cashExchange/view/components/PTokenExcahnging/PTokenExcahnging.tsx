import React, { useState, useCallback } from 'react';
import BN from 'bn.js';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading } from 'components/Loading';

import {
  Amounts,
  PTokenExchangingConfirmation,
} from '../PTokenExchangingConfirmation/PTokenExchangingConfirmation';
import { PTokenExchangingForm, Direction } from '../PTokenExchangingForm/PTokenExchangingForm';

interface IProps {
  title: string;
  maxValue: BN;
  placeholder: string;
  sourceSymbol: string;
  targetSymbol: string;
  direction: Direction;
  confirmText?: string;
  calculatedAmountText?: string;
  apiMethod: (account: string, amount: BN) => Promise<void>;
  onCancel: () => void;
}

function PTokenExchanging(props: IProps) {
  const {
    title,
    maxValue,
    placeholder,
    sourceSymbol,
    targetSymbol,
    direction,
    confirmText,
    apiMethod,
    onCancel,
    calculatedAmountText,
  } = props;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, [], null);
  const [amounts, setAmounts] = useState<Amounts | null>(null);

  const handlePTokenExchangingConfirmationClick = useCallback(async () => {
    if (!account) {
      throw new Error('You need to connect to Ethereum wallet');
    }
    await apiMethod(account, new BN(amounts?.givenAmount || 0));
    setAmounts(null);
    onCancel();
  }, [apiMethod, onCancel, api, account, amounts?.givenAmount]);

  const handlePTokenExchangingConfirmationCancel = useCallback(() => {
    setAmounts(null);
  }, []);

  return (
    <>
      <Loading meta={accountMeta} progressVariant="circle">
        <PTokenExchangingForm
          direction={direction}
          title={title}
          maxValue={maxValue}
          sourceSymbol={sourceSymbol}
          targetSymbol={targetSymbol}
          placeholder={placeholder}
          onSubmit={setAmounts}
          onCancel={onCancel}
          calculatedAmountText={calculatedAmountText}
        />
        <PTokenExchangingConfirmation
          isOpen={!!amounts}
          sourceSymbol={sourceSymbol}
          targetSymbol={targetSymbol}
          confirmText={confirmText}
          onConfirm={handlePTokenExchangingConfirmationClick}
          onCancel={handlePTokenExchangingConfirmationCancel}
          amounts={amounts}
        />
      </Loading>
    </>
  );
}

export { PTokenExchanging };
