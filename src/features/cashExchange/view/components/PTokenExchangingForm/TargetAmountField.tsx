import React, { useCallback } from 'react';
import BN from 'bn.js';
import Typography from '@material-ui/core/Typography';
import { Observable } from 'rxjs';

import { useApi } from 'services/api';
import { useTranslate } from 'services/i18n';
import { SpyField } from 'components/form';
import { Loading } from 'components/Loading';
import { Hint } from 'components/Hint/Hint';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';
import { useSubscribable } from 'utils/react';
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

function TargetAmountField(props: IProps) {
  const { direction, sourceAmount, spyFieldName, targetToken, messageTKey } = props;
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

  const renderCalculatedAmountMessage = useCallback(
    formattedAmount =>
      t(messageTKey || tKeys.features.cashExchange.exchangingForm.givenAmountText.getKey(), {
        formattedAmount,
      }),
    [messageTKey, t],
  );

  return (
    <>
      <SpyField name={spyFieldName} fieldValue={targetAmount || null} compare={compareBn} />
      <Loading meta={targetAmountMeta} component={Hint}>
        <Hint>
          <Typography>
            <FormattedBalance sum={targetAmount || new BN(0)} token={targetToken}>
              {({ formattedBalance }) => <>{renderCalculatedAmountMessage(formattedBalance)}</>}
            </FormattedBalance>
          </Typography>
        </Hint>
      </Loading>
    </>
  );
}

export { TargetAmountField };
