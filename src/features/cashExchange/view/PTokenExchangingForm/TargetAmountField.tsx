import React from 'react';
import BN from 'bn.js';

import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { SpyField } from 'components/form';

import { Direction } from './PTokenExchangingForm';

interface IProps {
  direction: Direction;
  sourceAmount: string;
  spyFieldName: string;
}

function TargetAmountField(props: IProps) {
  const { direction, sourceAmount, spyFieldName } = props;
  const api = useApi();

  const [targetAmount] = useSubscribable(
    direction === 'buy'
      ? () => api.getPTokenByDai$(new BN(sourceAmount))
      : () => api.getDaiByPToken$(new BN(sourceAmount)),
    [sourceAmount],
  );

  const compareValues = (prev: BN, current: BN) => {
    return prev && !prev.eq(current);
  };

  return (
    (targetAmount && (
      <SpyField name={spyFieldName} fieldValue={targetAmount} compare={compareValues as any} />
    )) ||
    null
  );
}

export { TargetAmountField };
