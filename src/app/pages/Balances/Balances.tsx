import * as React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { BalanceChanges, Earnings } from 'features/balance';
import { Grid, Box, Typography } from 'components';

import { WithAccount } from '../../components/WithAccount/WithAccount';

const tKeys = tKeysAll.app.pages.balances;

export function BalancesPage() {
  const { t } = useTranslate();

  return (
    <WithAccount>
      {({ account }) => (
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box mb={3}>
              <Typography variant="subtitle2">{t(tKeys.balanceChangesTitle.getKey())}</Typography>
            </Box>
            <BalanceChanges account={account} />
          </Grid>
          <Grid item xs={6}>
            <Box mb={3}>
              <Typography variant="subtitle2">{t(tKeys.earningsTitle.getKey())}</Typography>
            </Box>
            <Earnings account={account} />
          </Grid>
        </Grid>
      )}
    </WithAccount>
  );
}
