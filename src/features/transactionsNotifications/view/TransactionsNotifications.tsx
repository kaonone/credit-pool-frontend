import React from 'react';
import { useSnackbar } from 'notistack';

import { useSubscribable } from 'utils/react';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { IGenericSubmittedTransaction, SubmittedTransactionType } from 'services/api/types';

function TransactionsNotifications() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.notifications;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const api = useApi();
  const [transaction] = useSubscribable<
    IGenericSubmittedTransaction<SubmittedTransactionType, any>
  >(() => api.getSubmittedTransactions$(), []);

  const showNotifications = React.useCallback(
    async (submittedTransaction: IGenericSubmittedTransaction<SubmittedTransactionType, any>) => {
      const { type } = submittedTransaction;
      const pendingNotificationKey = enqueueSnackbar(t(tKeys[type].pending.getKey()), {
        persist: true,
        variant: 'info',
      });

      try {
        await submittedTransaction.promiEvent;
        enqueueSnackbar(t(tKeys[type].success.getKey()), { variant: 'success' });
      } catch {
        enqueueSnackbar(t(tKeys[type].error.getKey()), { variant: 'error' });
      } finally {
        pendingNotificationKey && closeSnackbar(pendingNotificationKey);
      }
    },
    [enqueueSnackbar, closeSnackbar],
  );

  React.useEffect(() => {
    transaction && showNotifications(transaction);
  }, [transaction]);

  return <></>;
}

export { TransactionsNotifications };
