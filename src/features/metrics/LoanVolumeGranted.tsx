import * as React from 'react';

import { Metric, Title, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function LoanVolumeGranted() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Title>{t(tKeys.loanVolumeGranted.getKey())}</Title>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
