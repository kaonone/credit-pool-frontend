import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function AverageLoanSize() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label>{t(tKeys.averageLoanSize.getKey())}</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
