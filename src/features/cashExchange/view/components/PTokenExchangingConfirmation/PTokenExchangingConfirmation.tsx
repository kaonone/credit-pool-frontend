import React, { useCallback } from 'react';
import BN from 'bn.js';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Hint } from 'components/Hint/Hint';
import { useCommunication } from 'utils/react';
import { formatBalance } from 'utils/format';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { DEFAULT_DECIMALS } from 'env';

export type Amounts = {
  givenAmount: string;
  receivedAmount: BN;
};

interface IProps {
  isOpen: boolean;
  amounts: Amounts | null;
  sourceSymbol: string;
  targetSymbol: string;
  confirmText?: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

function PTokenExchangingConfirmation(props: IProps) {
  const { sourceSymbol, targetSymbol, confirmText, onCancel, onConfirm, amounts, isOpen } = props;

  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.confirmCashExchangeForm;

  const communication = useCommunication(onConfirm, []);
  const { status, error } = communication;

  const confirmMessage = t(confirmText || tKeys.confirmMessage.getKey(), {
    sourceAmount: formatBalance({
      amountInBaseUnits: amounts?.givenAmount || '0',
      baseDecimals: DEFAULT_DECIMALS,
      tokenSymbol: sourceSymbol,
    }),
    targetAmount: formatBalance({
      amountInBaseUnits: amounts?.receivedAmount || '0',
      baseDecimals: DEFAULT_DECIMALS,
      tokenSymbol: targetSymbol,
    }),
  });

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
              <Typography>{confirmMessage}</Typography>
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
