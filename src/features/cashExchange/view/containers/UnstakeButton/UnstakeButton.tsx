import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import BN from 'bn.js';
import { of } from 'rxjs';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { useSubscribable } from 'utils/react';
import { formatBalance } from 'utils/format';
import { usePledgeSubscription } from 'generated/gql/pool';
import { getPledgeId } from 'model';
import { Loading } from 'components';

import {
  PTokenExchanging,
  ISubmittedFormData,
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
  const [daiTokenInfo] = useSubscribable(() => api.tokens.getTokenInfo$('dai'), []);

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
  const lLocked = pledgeGqlResult.data?.pledge?.lLocked || '0';
  const pLocked = pledgeGqlResult.data?.pledge?.pLocked || '0';
  const lInitialLocked = pledgeGqlResult.data?.pledge?.lInitialLocked || '0';

  const getConfirmMessage = useCallback(
    (values: ISubmittedFormData | null) => {
      const rawSourceAmount = new BN(values?.sourceAmount?.toString() || '0');
      const rawInterestShareDelta = rawSourceAmount
        .muln(10000)
        .mul(new BN(lInitialLocked))
        .div(new BN(lLocked))
        .div(fullLoanStake);

      const interestShareDelta =
        (daiTokenInfo &&
          `${formatBalance({
            amountInBaseUnits: rawInterestShareDelta,
            baseDecimals: 2,
          })}%`) ||
        '⏳';

      const sourceAmount =
        (daiTokenInfo &&
          formatBalance({
            amountInBaseUnits: rawSourceAmount,
            baseDecimals: daiTokenInfo.decimals,
            tokenSymbol: daiTokenInfo.symbol,
          })) ||
        '⏳';

      return of(t(tKeys.confirmMessage.getKey(), { sourceAmount, interestShareDelta }));
    },
    [daiTokenInfo, fullLoanStake.toString(), lInitialLocked, lLocked],
  );

  const getMaxSourceValue = useCallback(() => of(new BN(lLocked)), [lLocked]);
  const getMinSourceValue = useCallback(() => of(new BN(0)), []);

  const onUnstakeRequest = useCallback(
    (address: string, values: { sourceAmount: BN }): Promise<void> => {
      return api.loanModule.unstakePtk(address, {
        borrower,
        proposalId,
        lLocked,
        pLocked,
        ...values,
      });
    },
    [borrower, proposalId, lLocked, pLocked],
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
