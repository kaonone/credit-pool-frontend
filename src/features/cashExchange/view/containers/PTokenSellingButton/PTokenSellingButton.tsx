import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { map } from 'rxjs/operators';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { SellCashIcon } from 'components/icons';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { formatBalance } from 'utils/format';
import { useSubscribable } from 'utils/react';

import {
  PTokenExchanging,
  ISubmittedFormData,
} from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button>;

const tKeys = tKeysAll.features.cashExchange.pTokenSellingButton;

function PTokenSellingButton(props: IProps) {
  const { t } = useTranslate();
  const api = useApi();

  const getMaxSourceValue = useCallback((account: string) => api.getPtkBalanceInDai$(account), []);

  const [daiTokenInfo] = useSubscribable(() => api.getTokenInfo$('dai'), []);

  const confirmMessageTKey = useCallback(
    (values: ISubmittedFormData | null) => {
      const rawSourceAmount = values?.sourceAmount?.toString() || '0';
      return api.getDaiToDaiExitInfo$(rawSourceAmount).pipe(
        map(({ total, user, fee }) => {
          const sourceAmount =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: total,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
              })) ||
            '⏳';

          const targetAmount =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: user,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
              })) ||
            '⏳';

          const feeAmount =
            (daiTokenInfo &&
              formatBalance({
                amountInBaseUnits: fee,
                baseDecimals: daiTokenInfo.decimals,
                tokenSymbol: daiTokenInfo.symbol,
              })) ||
            '⏳';

          return t(tKeys.confirmMessage.getKey(), { sourceAmount, targetAmount, feeAmount });
        }),
      );
    },
    [daiTokenInfo],
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
          confirmMessageTKey={confirmMessageTKey}
          onExchangeRequest={api.sellPtk$}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { PTokenSellingButton };
