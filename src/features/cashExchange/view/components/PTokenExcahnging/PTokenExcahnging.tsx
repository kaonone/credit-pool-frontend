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
  sourcePlaceholder: string;
  sourceSymbol: string;
  targetSymbol: string;
  direction: Direction;
  confirmMessageTKey?: string;
  calculatedAmountTKey?: string;
  onExchangeRequest: (account: string, sourceAmount: BN, targetAmount: BN) => Promise<void>;
  onCancel: () => void;
}

function PTokenExchanging(props: IProps) {
  const {
    title,
    maxValue,
    sourcePlaceholder,
    sourceSymbol,
    targetSymbol,
    direction,
    confirmMessageTKey,
    onExchangeRequest,
    onCancel,
    calculatedAmountTKey,
  } = props;

  const api = useApi();
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, [], null);
  const [amounts, setAmounts] = useState<Amounts | null>(null);

  const handlePTokenExchangingConfirmationClick = useCallback(async () => {
    if (!account) {
      throw new Error('You need to connect to Ethereum wallet');
    }
    await onExchangeRequest(
      account,
      new BN(amounts?.givenAmount || 0),
      new BN(amounts?.receivedAmount || 0),
    );
    setAmounts(null);
    onCancel();
  }, [onExchangeRequest, onCancel, api, account, amounts?.givenAmount]);

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
          sourcePlaceholder={sourcePlaceholder}
          onSubmit={setAmounts}
          onCancel={onCancel}
          calculatedAmountTKey={calculatedAmountTKey}
        />
        <PTokenExchangingConfirmation
          isOpen={!!amounts}
          sourceSymbol={sourceSymbol}
          targetSymbol={targetSymbol}
          messageTKey={confirmMessageTKey}
          onConfirm={handlePTokenExchangingConfirmationClick}
          onCancel={handlePTokenExchangingConfirmationCancel}
          amounts={amounts}
        />
      </Loading>
    </>
  );
}

export { PTokenExchanging };
