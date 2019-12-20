import React, { useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Hint } from 'components/Hint/Hint';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';
import { useCommunication } from 'utils/react';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Token } from 'model/types';

import { ISubmittedFormData } from '../PTokenExchangingForm/PTokenExchangingForm';

interface IProps<ExtraFormData extends Record<string, any> = {}> {
  isOpen: boolean;
  values: (ISubmittedFormData & Omit<ExtraFormData, keyof ISubmittedFormData>) | null;
  sourceToken: Token;
  targetToken: Token;
  messageTKey?: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

function PTokenExchangingConfirmation<ExtraFormData extends Record<string, any> = {}>(
  props: IProps<ExtraFormData>,
) {
  const { sourceToken, targetToken, messageTKey, onCancel, onConfirm, values, isOpen } = props;

  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.exchangingConfirmation;

  const communication = useCommunication(onConfirm, []);
  const { status, error } = communication;

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
            <Hint>
              <Typography>
                <FormattedBalance sum={values?.sourceAmount || '0'} token={sourceToken}>
                  {({ formattedBalance: sourceAmount }) => (
                    <FormattedBalance sum={values?.targetAmount || '0'} token={targetToken}>
                      {({ formattedBalance: targetAmount }) => (
                        <>
                          {t(messageTKey || tKeys.confirmMessage.getKey(), {
                            sourceAmount,
                            targetAmount,
                          })}
                        </>
                      )}
                    </FormattedBalance>
                  )}
                </FormattedBalance>
              </Typography>
            </Hint>
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
              disabled={status === 'pending'}
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
