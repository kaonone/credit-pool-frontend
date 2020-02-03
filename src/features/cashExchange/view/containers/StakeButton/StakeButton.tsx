import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { map } from 'rxjs/operators';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { min, decimalsToWei } from 'utils/bn';
import { useSubscribable } from 'utils/react';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button> & {
  maxStakeSize: string;
  proposalId: string;
  borrower: string;
};

const tKeys = tKeysAll.features.cashExchange.stakeButton;

function StakeButton(props: IProps) {
  const { maxStakeSize, borrower, proposalId, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const [ptkTokenInfo] = useSubscribable(() => api.tokens.getTokenInfo$('ptk'), []);
  const decimals = ptkTokenInfo?.decimals || 0;

  const getMaxSourceValue = useCallback(
    (account: string) =>
      api.fundsModule.getPtkBalanceInDai$(account).pipe(
        map(balance => {
          const roundedBalance = balance
            .div(decimalsToWei(decimals - 2))
            .mul(decimalsToWei(decimals - 2));

          const roundedDownMaxStakeSize = new BN(maxStakeSize)
            .div(decimalsToWei(decimals - 2))
            .mul(decimalsToWei(decimals - 2));

          const roundedMaxStakeSize = roundedDownMaxStakeSize.lt(new BN(maxStakeSize))
            ? roundedDownMaxStakeSize.add(decimalsToWei(decimals - 2))
            : maxStakeSize;

          return min(roundedBalance, roundedMaxStakeSize);
        }),
      ),
    [maxStakeSize, decimals],
  );

  const onStakeRequest = useCallback(
    (address: string, values: { sourceAmount: BN }): Promise<void> => {
      return api.loanModule.stakePtk(address, { borrower, proposalId, ...values });
    },
    [borrower, proposalId],
  );

  return (
    <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
      {({ closeModal }) => (
        <PTokenExchanging
          title={t(tKeys.formTitle.getKey())}
          sourcePlaceholder={t(tKeys.placeholder.getKey())}
          getMaxSourceValue={getMaxSourceValue}
          confirmMessageTKey={tKeys.confirmMessage.getKey()}
          onExchangeRequest={onStakeRequest}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { StakeButton };
