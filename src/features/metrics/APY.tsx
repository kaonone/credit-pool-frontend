import * as React from 'react';

import { Label, FormattedAmount, Metric } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { percentAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics.apy;

export function APY() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label hint={t(tKeys.description.getKey())}>APY</Label>}
      value={<FormattedAmount sum={percentAmount} />}
    />
  );
}
