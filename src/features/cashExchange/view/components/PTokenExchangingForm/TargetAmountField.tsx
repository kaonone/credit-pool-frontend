import React, { useCallback } from 'react';
import BN from 'bn.js';
import Typography from '@material-ui/core/Typography';
import { Observable } from 'rxjs';

import { useApi } from 'services/api';
import { useTranslate } from 'services/i18n';
import { SpyField } from 'components/form';
import { Loading } from 'components/Loading';
import { Hint } from 'components/Hint/Hint';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';
import { compareBn } from 'utils/bn';
import { DEFAULT_DECIMALS } from 'env';

import { Direction } from './PTokenExchangingForm';

interface IProps {
  direction: Direction;
  sourceAmount: string;
  targetSymbol: string;
  spyFieldName: string;
  messageTKey?: string;
}

function TargetAmountField(props: IProps) {
  const { direction, sourceAmount, spyFieldName, targetSymbol, messageTKey } = props;
  const { t, tKeys } = useTranslate();
  const api = useApi();

  const methodByDirection: Record<Direction, (value: string) => Observable<BN>> = {
    DaiToPtk: api.getPTokenByDai$,
    PtkToDai: api.getDaiByPToken$,
    DaiToLoanCollateral: api.getLoanCollateralByDai$,
  };

  const [targetAmount, targetAmountMeta] = useSubscribable(
    () => methodByDirection[direction](sourceAmount),
    [sourceAmount, direction],
  );

  const renderCalculatedAmountMessage = useCallback(() => {
    const formattedAmount = formatBalance({
      amountInBaseUnits: targetAmount || new BN(0),
      baseDecimals: DEFAULT_DECIMALS,
      tokenSymbol: targetSymbol,
    });

    return t(messageTKey || tKeys.features.cashExchange.exchangingForm.givenAmountText.getKey(), {
      formattedAmount,
    });
  }, [targetSymbol, targetAmount, messageTKey, t]);

  return (
    <>
      <SpyField name={spyFieldName} fieldValue={targetAmount || null} compare={compareBn} />
      <Loading meta={targetAmountMeta} component={Hint}>
        <Hint>
          <Typography>{renderCalculatedAmountMessage()}</Typography>
        </Hint>
      </Loading>
    </>
  );
}

export { TargetAmountField };
