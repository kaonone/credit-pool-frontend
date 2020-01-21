import React from 'react';
import BN from 'bn.js';
import Typography from '@material-ui/core/Typography';
import { Observable } from 'rxjs';

import { useApi } from 'services/api';
import { useTranslate } from 'services/i18n';
import { SpyField } from 'components/form';
import { Loading } from 'components/Loading';
import { Hint } from 'components/Hint/Hint';
import { useSubscribable, useFormattedBalance } from 'utils/react';
import { compareBn } from 'utils/bn';
import { Token } from 'model/types';

import { Direction } from './PTokenExchangingForm';

interface IProps {
  direction: Direction;
  sourceAmount: string;
  targetToken: Token;
  spyFieldName: string;
  messageTKey?: string;
}

// TODO remove this component if PTK doesn't return
function TargetAmountField(props: IProps) {
  const { direction, sourceAmount, spyFieldName, targetToken, messageTKey } = props;
  const { t, tKeys } = useTranslate();
  const api = useApi();

  const methodByDirection: Record<Direction, (value: string) => Observable<BN>> = {
    DaiToPtk: api.convertDaiToPtkEnter$,
    PtkToDai: api.convertPtkToDaiExit$,
    DaiToLoanCollateral: api.getMinLoanCollateralByDaiInDai$,
  };

  const [targetAmount, targetAmountMeta] = useSubscribable(
    () => methodByDirection[direction](sourceAmount),
    [sourceAmount, direction],
  );

  const [formattedAmount] = useFormattedBalance(targetToken, targetAmount || '0');

  return (
    <>
      <SpyField name={spyFieldName} fieldValue={targetAmount || null} compare={compareBn} />
      <Loading meta={targetAmountMeta} component={Hint}>
        <Hint>
          <Typography>
            {t(messageTKey || tKeys.features.cashExchange.exchangingForm.givenAmountText.getKey(), {
              formattedAmount,
            })}
          </Typography>
        </Hint>
      </Loading>
    </>
  );
}

export { TargetAmountField };
