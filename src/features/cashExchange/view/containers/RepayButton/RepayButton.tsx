import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import { of } from 'rxjs';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';
import { max, min } from 'utils/bn';

import {
  PTokenExchanging,
  ISubmittedFormData,
} from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button> & {
  debtId: string;
  lastPaymentDate: string;
  account: string;
};

const tKeys = tKeysAll.features.cashExchange.repayButton;

function RepayButton(props: IProps) {
  const { debtId, account, lastPaymentDate, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const [daiTokenInfo] = useSubscribable(() => api.tokens.getTokenInfo$('dai'), []);

  const getConfirmMessage = useCallback(
    (values: ISubmittedFormData | null) => {
      const rawSourceAmount = new BN(values?.sourceAmount?.toString() || '0');

      return api.loanModule.getDebtRequiredPayments$(account, debtId, lastPaymentDate).pipe(
        map(({ currentInterest }) => {
          const rawBody = max('0', rawSourceAmount.sub(currentInterest));
          const rawInterest = min(rawSourceAmount, currentInterest);

          const body =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: rawBody,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
                precision: 4,
              })) ||
            '⏳';

          const interest =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: rawInterest,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
                precision: 4,
              })) ||
            '⏳';

          const sourceAmount =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: rawSourceAmount,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
                precision: 4,
              })) ||
            '⏳';

          return t(tKeys.confirmMessage.getKey(), { body, interest, sourceAmount });
        }),
      );
    },
    [daiTokenInfo, account, lastPaymentDate],
  );

  const getMaxSourceValue = useCallback(
    () =>
      api.loanModule
        .getDebtRequiredPayments$(account, debtId, lastPaymentDate)
        .pipe(map(({ currentInterest, loanSize }) => currentInterest.add(loanSize))),
    [debtId, account, lastPaymentDate],
  );
  const getMinSourceValue = useCallback(() => of(new BN(0)), []);

  const onRepayRequest = useCallback(
    (address: string, values: { sourceAmount: BN }): Promise<void> => {
      return api.loanModule.repay(address, debtId, values.sourceAmount);
    },
    [debtId],
  );

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          sourcePlaceholder={t(tKeys.placeholder.getKey())}
          getMaxSourceValue={getMaxSourceValue}
          getMinSourceValue={getMinSourceValue}
          confirmMessageTKey={getConfirmMessage}
          onExchangeRequest={onRepayRequest}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { RepayButton };
