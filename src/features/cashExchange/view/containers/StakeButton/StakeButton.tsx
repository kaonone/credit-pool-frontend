import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { map } from 'rxjs/operators';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ModalButton } from 'components/ModalButton/ModalButton';
import { min, roundWei } from 'utils/bn';
import { useSubscribable } from 'utils/react';
import { useMyUserSubscription } from 'generated/gql/pool';
import { zeroAddress } from 'utils/mock';
import { Loading } from 'components';
import { formatBalance } from 'utils/format';
import { calcInterestShare } from 'model';

import {
  PTokenExchanging,
  ISubmittedFormData,
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

  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);
  const [daiTokenInfo, daiTokenInfoMeta] = useSubscribable(
    () => api.tokens.getTokenInfo$('dai'),
    [],
  );
  const [ptkTokenInfo, ptkTokenInfoMeta] = useSubscribable(
    () => api.tokens.getTokenInfo$('ptk'),
    [],
  );
  const decimals = ptkTokenInfo?.decimals || 0;

  const userGqlResult = useMyUserSubscription({ variables: { address: account || zeroAddress } });
  const lUserBalance = userGqlResult.data?.user?.lBalance || '0';
  const pUserBalance = userGqlResult.data?.user?.pBalance || '0';

  const [fullLoanStake, fullLoanStakeMeta] = useSubscribable(
    () => api.loanModule.calculateFullLoanStake$(loanSize),
    [loanSize],
    new BN(0),
  );

  const getConfirmMessage = useCallback(
    (values: ISubmittedFormData | null) => {
      const rawSourceAmount = new BN(values?.sourceAmount?.toString() || '0');

      const pSourceAmount = new BN(pUserBalance)
        .mul(new BN(rawSourceAmount))
        .div(new BN(lUserBalance));

      return api.fundsModule.getPtkToDaiExitInfo$(pSourceAmount.toString()).pipe(
        map(({ total }) => {
          const interestShareDecimals = 2;
          const rawInterestShareDelta = calcInterestShare(
            total,
            fullLoanStake,
            interestShareDecimals,
          );

          const interestShareDelta =
            (daiTokenInfo &&
              `${formatBalance({
                amountInBaseUnits: rawInterestShareDelta,
                baseDecimals: interestShareDecimals,
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

          return t(tKeys.confirmMessage.getKey(), { interestShareDelta, sourceAmount });
        }),
      );
    },
    [daiTokenInfo, account, pUserBalance, lUserBalance, fullLoanStake],
  );

  const getMaxSourceValue = useCallback(
    () =>
      api.loanModule.getPledgeRequirements$(borrower, proposalId).pipe(
        map(({ maxPPledge }) => {
          const roundedBalance = roundWei(lUserBalance, decimals, 'floor', 2);

          const maxLStakeSize = new BN(lUserBalance).mul(maxPPledge).div(new BN(pUserBalance));
          const roundedMaxStakeSize = roundWei(maxLStakeSize, decimals, 'ceil', 2);

          return min(roundedBalance, roundedMaxStakeSize);
        }),
      ),
    [borrower, proposalId, decimals, lUserBalance, pUserBalance],
  );
  const getMinSourceValue = useCallback(
    () =>
      api.loanModule.getPledgeRequirements$(borrower, proposalId).pipe(
        map(({ minPPledge }) => {
          return new BN(lUserBalance).mul(minPPledge).div(new BN(pUserBalance));
        }),
      ),
    [borrower, proposalId, lUserBalance, pUserBalance],
  );

  const onStakeRequest = useCallback(
    (address: string, values: { sourceAmount: BN }): Promise<void> => {
      return api.loanModule.stakePtk(address, {
        borrower,
        proposalId,
        lUserBalance,
        pUserBalance,
        ...values,
      });
    },
    [borrower, proposalId, lUserBalance, pUserBalance],
  );

  return (
    <Loading
      meta={[accountMeta, daiTokenInfoMeta, ptkTokenInfoMeta, fullLoanStakeMeta]}
      gqlResults={userGqlResult}
      progressVariant="linear"
    >
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
