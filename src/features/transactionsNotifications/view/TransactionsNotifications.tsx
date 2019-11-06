import React from 'react';
import { useSnackbar } from 'notistack';
import { empty } from 'rxjs';

import { useSubscribable } from 'utils/react';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { ISubmittedTransaction } from 'services/api/types';

function TransactionsNotifications() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.notifications;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [transaction] = useSubscribable<ISubmittedTransaction>(() => empty(), []);

  const showNotifications = React.useCallback(
    async (submittedTransaction: ISubmittedTransaction) => {
      const { type } = submittedTransaction;
      const pendingNotificationKey = enqueueSnackbar(t(tKeys[type].pending.getKey()), {
        persist: true,
        variant: 'info',
      });

      try {
        await submittedTransaction.promise;
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
