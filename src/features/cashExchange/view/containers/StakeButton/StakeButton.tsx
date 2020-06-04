import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import { combineLatest, of } from 'rxjs';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { min, roundWei } from 'utils/bn';
import { useSubscribable } from 'utils/react';
import { Loading } from 'components';
import { formatBalance } from 'utils/format';
import { calcInterestShare } from 'model';
import { TokenAmount } from 'model/entities';

import {
  PTokenExchanging,
  ISubmittedFormData,
  PTokenExchangingProps,
} from '../../components/PTokenExcahnging/PTokenExcahnging';

type IProps = React.ComponentPropsWithoutRef<typeof Button> & {
  loanSize: string;
  proposalId: string;
  borrower: string;
};

const tKeys = tKeysAll.features.cashExchange.stakeButton;

function StakeButton(props: IProps) {
  const { borrower, proposalId, loanSize, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const [fullLoanStake, fullLoanStakeMeta] = useSubscribable(
    () => api.loanModule.calculateFullLoanStake$(loanSize),
    [loanSize],
    new BN(0),
  );

  const getConfirmMessage = useCallback(
    ({ sourceAmount }: ISubmittedFormData) => {
      const rawSourceAmount = sourceAmount.value;

      const interestShareDecimals = 2;
      const rawInterestShareDelta = calcInterestShare(
        rawSourceAmount,
        fullLoanStake,
        interestShareDecimals,
      );

      const interestShareDelta = `${formatBalance({
        amountInBaseUnits: rawInterestShareDelta,
        baseDecimals: interestShareDecimals,
      })}%`;

      return of(
        t(tKeys.confirmMessage.getKey(), {
          interestShareDelta,
          sourceAmount: sourceAmount.toFormattedString(),
        }),
      );
    },
    [t, fullLoanStake],
  );

  const getMaxSourceValue: PTokenExchangingProps['getMaxSourceValue'] = useCallback(
    ({ account, token }) =>
      combineLatest([
        api.fundsModule.getPtkBalanceInDaiWithoutFee$(account),
        api.loanModule.getPledgeRequirements$(borrower, proposalId),
      ]).pipe(
        map(([balance, { maxLPledge }]) => {
          const roundedBalance = roundWei(balance, token.decimals, 'floor', 2);
          const roundedMaxStakeSize = roundWei(maxLPledge, token.decimals, 'ceil', 2);

          return min(roundedBalance, roundedMaxStakeSize);
        }),
      ),
    [borrower, proposalId],
  );
  const getMinSourceValue: PTokenExchangingProps['getMinSourceValue'] = useCallback(
    () =>
      api.loanModule
        .getPledgeRequirements$(borrower, proposalId)
        .pipe(map(({ minLPledge }) => minLPledge)),
    [borrower, proposalId],
  );

  const onStakeRequest = useCallback(
    // TODO use liquidity token
    (address: string, values: { sourceAmount: TokenAmount }): Promise<void> => {
      return api.loanModule.stakePtk(address, {
        borrower,
        proposalId,
        ...values,
      });
    },
    [borrower, proposalId],
  );

  return (
    <Loading meta={fullLoanStakeMeta} progressVariant="linear">
      <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
        {({ closeModal }) => (
          <PTokenExchanging
            title={t(tKeys.formTitle.getKey())}
            sourcePlaceholder={t(tKeys.placeholder.getKey())}
            getMaxSourceValue={getMaxSourceValue}
            getMinSourceValue={getMinSourceValue}
            confirmMessageTKey={getConfirmMessage}
            onExchangeRequest={onStakeRequest}
            onCancel={closeModal}
          />
        )}
      </ModalButton>
    </Loading>
  );
}

export { StakeButton };
