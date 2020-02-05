import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import { combineLatest } from 'rxjs';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { min, roundWei } from 'utils/bn';
import { useSubscribable } from 'utils/react';

import { PTokenExchanging } from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button> & {
  proposalId: string;
  borrower: string;
};

const tKeys = tKeysAll.features.cashExchange.stakeButton;

function StakeButton(props: IProps) {
  const { borrower, proposalId, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const [ptkTokenInfo] = useSubscribable(() => api.tokens.getTokenInfo$('ptk'), []);
  const decimals = ptkTokenInfo?.decimals || 0;

  const getMaxSourceValue = useCallback(
    (account: string) =>
      combineLatest([
        api.fundsModule.getPtkBalanceInDai$(account),
        api.loanModule.getPledgeRequirements$(borrower, proposalId),
      ]).pipe(
        map(([balance, { maxLPledge }]) => {
          const roundedBalance = roundWei(balance, decimals, 'floor', 2);
          const roundedMaxStakeSize = roundWei(maxLPledge, decimals, 'ceil', 2);

          return min(roundedBalance, roundedMaxStakeSize);
        }),
      ),
    [borrower, proposalId, decimals],
  );
  const getMinSourceValue = useCallback(
    () =>
      api.loanModule
        .getPledgeRequirements$(borrower, proposalId)
        .pipe(map(({ minLPledge }) => minLPledge)),
    [borrower, proposalId],
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
          getMinSourceValue={getMinSourceValue}
          confirmMessageTKey={tKeys.confirmMessage.getKey()}
          onExchangeRequest={onStakeRequest}
          onCancel={closeModal}
        />
      )}
    </ModalButton>
  );
}

export { StakeButton };
