import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { SellCashIcon } from 'components/icons';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { useSubscribable } from 'utils/react';
import { zeroAddress } from 'utils/mock';
import { formatBalance } from 'utils/format';

import {
  PTokenExchanging,
  ISubmittedFormData,
} from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button>;

const tKeys = tKeysAll.features.cashExchange.pTokenSellingButton;

function PTokenSellingButton(props: IProps) {
  const { t } = useTranslate();
  const api = useApi();

  const [account] = useSubscribable(() => api.web3Manager.account, []);
  const [daiTokenInfo] = useSubscribable(() => api.tokens.getTokenInfo$('dai'), []);

  const getMaxSourceValue = useCallback(
    (acc: string) => api.fundsModule.getMaxWithdrawAmountInDai$(acc),
    [],
  );
  const getMinSourceValue = useCallback(
    () =>
      api.liquidityModule
        .getConfig$()
        .pipe(
          switchMap(({ pWithdrawMin }) =>
            api.fundsModule.getUserWithdrawAmountInDai$(pWithdrawMin.toString()),
          ),
        ),
    [],
  );

  const getConfirmMessage = useCallback(
    (values: ISubmittedFormData | null) => {
      const rawSourceAmount = values?.sourceAmount?.toString() || '0';

      return combineLatest([
        api.fundsModule.getMaxWithdrawAmountInDai$(account || zeroAddress),
        api.fundsModule.getAvailableBalance$(account || zeroAddress),
      ]).pipe(
        map(([maxWithdrawAmount, availableBalance]) => {
          const rawInterestAmount = availableBalance.sub(maxWithdrawAmount);

          const interestAmount =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: rawInterestAmount,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
              })) ||
            '⏳';

          const fullAmount =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: new BN(rawSourceAmount).add(rawInterestAmount),
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
              })) ||
            '⏳';

          const sourceAmount =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: rawSourceAmount,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
              })) ||
            '⏳';

          return (
            t(tKeys.confirmMessage.getKey(), { sourceAmount }) +
            (rawInterestAmount.gt(new BN(0))
              ? t(tKeys.interestConfirmation.getKey(), { interestAmount, fullAmount })
              : '')
          );
        }),
      );
    },
    [daiTokenInfo, account],
  );

  return (
    <ModalButton
      startIcon={<SellCashIcon />}
      content={t(tKeys.buttonTitle.getKey())}
      fullWidth
      {...props}
    >
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          sourcePlaceholder={t(tKeys.placeholder.getKey())}
          getMaxSourceValue={getMaxSourceValue}
          getMinSourceValue={getMinSourceValue}
          confirmMessageTKey={getConfirmMessage}
          onExchangeRequest={api.liquidityModule.sellPtk}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { PTokenSellingButton };
