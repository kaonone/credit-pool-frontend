import React from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Grid, Hint, Typography, Button, CircularProgress } from 'components';
import { formatBalance } from 'utils/format';
import { Communication } from 'utils/react';

export type Amount = {
  givenAmount: string;
  receivedAmount: BN;
};

interface IProps {
  amount: Amount | null;
  sourceSymbol: string;
  targetSymbol: string;
  communication: Communication<any, any>;
  onCancel: () => void;
}

function PTokenExchangingConfirmation(props: IProps) {
  const { sourceSymbol, targetSymbol, onCancel, amount, communication } = props;

  const { status, error } = communication;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.confirmCashExchangeForm;

  const confirmMessage = t(tKeys.confirmMessage.getKey(), {
    givenAmount: formatBalance({
      amountInBaseUnits: amount?.givenAmount || '0',
      baseDecimals: 0,
      tokenSymbol: sourceSymbol,
    }),
    receivedAmount: formatBalance({
      amountInBaseUnits: amount?.receivedAmount || '0',
      baseDecimals: 0,
      tokenSymbol: targetSymbol,
    }),
  });

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" noWrap gutterBottom>
            {t(tKeys.title.getKey())}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Hint>
            <Typography>{confirmMessage}</Typography>
          </Hint>
          {communication.status === 'error' && (
            <Hint>
              <Typography color="error">{error}</Typography>
            </Hint>
          )}
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onCancel}
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
    </>
  );
}

export { PTokenExchangingConfirmation };
