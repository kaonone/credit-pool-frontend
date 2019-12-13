import React, { useCallback } from 'react';
import BN from 'bn.js';

import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { SpyField } from 'components/form';
import { Loading, Hint, Typography } from 'components';
import { formatBalance } from 'utils/format';
import { useTranslate } from 'services/i18n';

import { Direction } from './PTokenExchangingForm';

interface IProps {
  direction: Direction;
  sourceAmount: string;
  targetSymbol: string;
  spyFieldName: string;
}

function TargetAmountField(props: IProps) {
  const { direction, sourceAmount, spyFieldName, targetSymbol } = props;
  const { t, tKeys } = useTranslate();
  const api = useApi();

  const [targetAmount, targetAmountMeta] = useSubscribable(
    direction === 'buy'
      ? () => api.getPTokenByDai$(sourceAmount)
      : () => api.getDaiByPToken$(sourceAmount),
    [sourceAmount, direction],
  );

  const compareValues = useCallback((prev: BN | null, current: BN | null) => {
    return Boolean(
      (!prev && current) || (prev && !current) || (prev && current && !prev.eq(current)),
    );
  }, []);

  const renderCalculatedAmountMessage = useCallback(() => {
    const formattedAmount = formatBalance({
      amountInBaseUnits: targetAmount || new BN(0),
      baseDecimals: 0,
      tokenSymbol: targetSymbol,
    });

    return t(tKeys.features.cashExchange.cashExchangeForm.givenAmountText.getKey(), {
      formattedAmount,
    });
  }, [targetSymbol, targetAmount, t]);

  return (
    <>
      <SpyField name={spyFieldName} fieldValue={targetAmount || null} compare={compareValues} />
      <Loading meta={targetAmountMeta} component={Hint}>
        <Hint>
          <Typography>{renderCalculatedAmountMessage()}</Typography>
        </Hint>
      </Loading>
    </>
  );
}

export { TargetAmountField };
