import * as React from 'react';

import { AKROIcon } from 'components/icons';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Label, FormattedAmount, Metric, Box, ComingSoon } from 'components';
import { tokenAmount, liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics.akro;

export function AKRO() {
  const { t } = useTranslate();

  return (
    <Box position="relative">
      <ComingSoon />
      <Metric
        title={
          <Label hint={t(tKeys.description.getKey())} icon={<AKROIcon />}>
            AKRO
          </Label>
        }
        value={<FormattedAmount sum={tokenAmount} hideSymbol />}
        subValue={<FormattedAmount sum={liquidityAmount} />}
      />
    </Box>
  );
}
