import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Label, FormattedAmount, Metric } from 'components';
import { liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics.allMyIssuedLoans;

export function AllMyIssuedLoans() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label>{t(tKeys.label.getKey())}</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
