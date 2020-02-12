import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ConfirmationDialog, Loading, FormattedBalance } from 'components';
import { useSubscribable } from 'utils/react';
import { usePledgeSubscription } from 'generated/gql/pool';
import { getPledgeId } from 'model';
import { zeroAddress } from 'utils/mock';
import { formatBalance } from 'utils/format';

type IProps = React.ComponentPropsWithoutRef<typeof Button> & {
  proposalId: string;
  debtId: string;
  borrower: string;
};

const tKeysConfirmation = tKeysAll.features.cashExchange.exchangingConfirmation;
const tKeys = tKeysAll.features.cashExchange.unlockButton;

function UnlockButton(props: IProps) {
  const { borrower, proposalId, debtId, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const [daiTokenInfo, daiTokenInfoMeta] = useSubscribable(
    () => api.tokens.getTokenInfo$('dai'),
    [],
  );
  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account, []);
  const pledgeGqlResult = usePledgeSubscription({
    variables: {
      pledgeHash: account && proposalId ? getPledgeId(account, borrower, proposalId) : '',
    },
  });

  const lInterest = pledgeGqlResult.data?.pledge?.lInterest;
  const pInterest = pledgeGqlResult.data?.pledge?.pInterest;
  const lLocked = pledgeGqlResult.data?.pledge?.lLocked;
  const pLocked = pledgeGqlResult.data?.pledge?.pLocked;

  const [pAvailableForUnlock, pAvailableForUnlockMeta] = useSubscribable(
    () => api.loanModule.calculatePAvailableForUnlock$(borrower, account || zeroAddress, debtId),
    [borrower, account, debtId],
  );

  const lPledgeForUnlock =
    lLocked &&
    pAvailableForUnlock &&
    pInterest &&
    pLocked &&
    calculatePledgeForUnlock({
      lLocked,
      pAvailableForUnlock: pAvailableForUnlock.toString(),
      pInterest,
      pLocked,
    }).lPledgeForUnlock;

  const lAvailableForUnlock =
    lInterest && lPledgeForUnlock && new BN(lInterest).add(lPledgeForUnlock);

  const confirmMessage = t(tKeys.confirmMessage.getKey(), {
    pledgeForUnlock:
      (lPledgeForUnlock &&
        daiTokenInfo &&
        formatBalance({
          amountInBaseUnits: lPledgeForUnlock,
          baseDecimals: daiTokenInfo.decimals,
          tokenSymbol: daiTokenInfo.symbol,
        })) ||
      '⏳',
    earnForUnlock:
      (lInterest &&
        daiTokenInfo &&
        formatBalance({
          amountInBaseUnits: lInterest,
          baseDecimals: daiTokenInfo.decimals,
          tokenSymbol: daiTokenInfo.symbol,
        })) ||
      '⏳',
  });

  const handleActivate = useCallback(async (): Promise<void> => {
    account && (await api.loanModule.unlockPtkFromPledge(account, { borrower, debtId }));
    close();
  }, [account, borrower, debtId]);

  return (
    <>
      <Loading
        meta={[daiTokenInfoMeta, accountMeta, pAvailableForUnlockMeta]}
        gqlResults={pledgeGqlResult}
      >
        <Button {...restProps} onClick={open}>
          {t(tKeys.buttonTitle.getKey())}&nbsp;
          {lAvailableForUnlock && <FormattedBalance sum={lAvailableForUnlock} token="dai" />}
        </Button>
      </Loading>
      <ConfirmationDialog
        isOpen={isOpen}
        message={confirmMessage}
        noText={t(tKeysConfirmation.no.getKey())}
        yesText={t(tKeysConfirmation.yes.getKey())}
        title={t(tKeysConfirmation.title.getKey())}
        onCancel={close}
        onConfirm={handleActivate}
      />
    </>
  );
}

function calculatePledgeForUnlock(options: {
  pAvailableForUnlock: string;
  pInterest: string;
  lLocked: string;
  pLocked: string;
}) {
  const { lLocked, pAvailableForUnlock, pInterest, pLocked } = options;

  const pPledgeForUnlock = new BN(pAvailableForUnlock).sub(new BN(pInterest));

  const lPledgeForUnlock = new BN(lLocked).mul(pPledgeForUnlock).div(new BN(pLocked));
  return { pPledgeForUnlock, lPledgeForUnlock };
}

export { UnlockButton };
