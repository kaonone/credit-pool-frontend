import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import BN from 'bn.js';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';
import { usePledgeSubscription } from 'generated/gql/pool';
import { getPledgeId, calcInterestShare } from 'model';
import { Loading } from 'components';
import { zeroAddress } from 'utils/mock';
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

const tKeys = tKeysAll.features.cashExchange.unstakeButton;

function UnstakeButton(props: IProps) {
  const { borrower, proposalId, loanSize, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);

  const [fullLoanStake, fullLoanStakeMeta] = useSubscribable(
    () => api.loanModule.calculateFullLoanStake$(loanSize),
    [loanSize],
    new BN(0),
  );

  const pledgeGqlResult = usePledgeSubscription({
    variables: {
      pledgeHash: account && proposalId ? getPledgeId(account, borrower, proposalId) : '',
    },
  });
  const pInitialLocked = pledgeGqlResult.data?.pledge?.pInitialLocked || '0';
  const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';

  const getConfirmMessage = useCallback(
    ({ sourceAmount }: ISubmittedFormData) => {
      return api.fundsModule
        .getAvailableBalanceIncreasing$(account || zeroAddress, pInitialLocked, lInitialLocked)
        .pipe(
          map(currentFullStakeCost => {
            const rawSourceAmount = sourceAmount.value;
            const interestShareDecimals = 2;

            const lAmountForUnstakeByInitial = new BN(lInitialLocked)
              .mul(rawSourceAmount)
              .div(currentFullStakeCost.value);

            const rawInterestShareDelta = calcInterestShare(
              lAmountForUnstakeByInitial,
              fullLoanStake,
              interestShareDecimals,
            );

            const interestShareDelta = `${formatBalance({
              amountInBaseUnits: rawInterestShareDelta,
              baseDecimals: interestShareDecimals,
            })}%`;

            return t(tKeys.confirmMessage.getKey(), {
              sourceAmount: sourceAmount.toFormattedString(),
              interestShareDelta,
            });
          }),
        );
    },
    [account, fullLoanStake.toString(), pInitialLocked, lInitialLocked],
  );

  const getMaxSourceValue: PTokenExchangingProps['getMaxSourceValue'] = useCallback(
    () =>
      api.fundsModule
        .getAvailableBalanceIncreasing$(account || zeroAddress, pInitialLocked, lInitialLocked)
        .pipe(map(item => item.value)),
    [api, account, pInitialLocked, lInitialLocked],
  );
  const getMinSourceValue: PTokenExchangingProps['getMinSourceValue'] = useCallback(
    () => of(new BN(0)),
    [],
  );

  const onUnstakeRequest = useCallback(
    (address: string, values: { sourceAmount: TokenAmount }): Promise<void> => {
      return api.loanModule.unstakePtk(address, {
        borrower,
        proposalId,
        lInitialLocked,
        pInitialLocked,
        ...values,
      });
    },
    [borrower, proposalId, lInitialLocked, pInitialLocked],
  );

  return (
    <Loading meta={[accountMeta, fullLoanStakeMeta]} progressVariant="linear">
      <ModalButton content={t(tKeys.buttonTitle.getKey())} fullWidth {...restProps}>
        {({ closeModal }) => (
          <PTokenExchanging
            title={t(tKeys.formTitle.getKey())}
            sourcePlaceholder={t(tKeys.placeholder.getKey())}
            getMaxSourceValue={getMaxSourceValue}
            getMinSourceValue={getMinSourceValue}
            confirmMessageTKey={getConfirmMessage}
            onExchangeRequest={onUnstakeRequest}
            onCancel={closeModal}
          />
        )}
      </ModalButton>
    </Loading>
  );
}

export { UnstakeButton };
