import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Grid, Hint, Typography, Button } from 'components';
import { formatBalance } from 'utils/format';

interface IProps {
  givenAmount: string;
  sourceSymbol: string;
  receivedAmount: string;
  targetSymbol: string;
  onClick: () => void;
  onCancel: () => void;
}

function ConfirmCashExchangeForm(props: IProps) {
  const { givenAmount, sourceSymbol, targetSymbol, receivedAmount, onCancel, onClick } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.acceptCashExchangeForm;

  const confirmMessage = t(tKeys.confirmMessage.getKey(), {
    givenAmount: formatBalance({
      amountInBaseUnits: givenAmount,
      baseDecimals: 0,
      tokenSymbol: sourceSymbol,
    }),
    receivedAmount: formatBalance({
      amountInBaseUnits: receivedAmount,
      baseDecimals: 0,
      tokenSymbol: targetSymbol,
    }),
  });

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Hint>
            <Typography>{confirmMessage}</Typography>
          </Hint>
        </Grid>

        <Grid item xs={6}>
          <Button variant="outlined" color="primary" fullWidth onClick={onCancel}>
            {t(tKeys.no.getKey())}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" type="submit" fullWidth onClick={onClick}>
            {t(tKeys.yes.getKey())}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export { ConfirmCashExchangeForm };
