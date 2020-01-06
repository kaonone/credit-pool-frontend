import React, { useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Observable } from 'rxjs';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Loading, Hint } from 'components';
import { useCommunication, useFormattedBalance, useSubscribable } from 'utils/react';

import { ISubmittedFormData } from '../PTokenExchangingForm/PTokenExchangingForm';

interface IProps<ExtraFormData extends Record<string, any> = {}> {
  isOpen: boolean;
  values: (ISubmittedFormData & Omit<ExtraFormData, keyof ISubmittedFormData>) | null;
  messageTKey:
    | string
    | ((
        values: (ISubmittedFormData & Omit<ExtraFormData, keyof ISubmittedFormData>) | null,
      ) => Observable<string>);
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

function PTokenExchangingConfirmation<ExtraFormData extends Record<string, any> = {}>(
  props: IProps<ExtraFormData>,
) {
  const { messageTKey, onCancel, onConfirm, values, isOpen } = props;

  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.exchangingConfirmation;

  const communication = useCommunication(onConfirm, []);
  const { status, error } = communication;

  const [sourceAmount] = useFormattedBalance('dai', values?.sourceAmount || '0');

  const [message, messageMeta] =
    typeof messageTKey === 'string'
      ? [t(messageTKey, { sourceAmount }), { loaded: true }]
      : useSubscribable(() => messageTKey(values), [values]);

  const handleCancel = useCallback(() => {
    onCancel();
    communication.reset();
  }, [onCancel, communication.reset]);

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleCancel}>
      <DialogContent>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {t(tKeys.title.getKey())}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Loading component={Hint} meta={messageMeta}>
              <Typography>{message}</Typography>
            </Loading>
          </Grid>
          {communication.status === 'error' && error && (
            <Grid item xs={12}>
              <Hint>
                <Typography color="error">{error}</Typography>
              </Hint>
            </Grid>
          )}
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleCancel}
              disabled={status === 'pending'}
            >
              {t(tKeys.no.getKey())}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={communication.execute}
              disabled={status === 'pending' || !messageMeta.loaded}
            >
              {status === 'pending' ? <CircularProgress size={24} /> : t(tKeys.yes.getKey())}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export { PTokenExchangingConfirmation };
