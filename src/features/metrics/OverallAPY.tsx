import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Title, FormattedAmount, Metric } from 'components';
import { percentAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics.overallAPY;

export function OverallAPY() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Title>{t(tKeys.label.getKey())}</Title>}
      value={<FormattedAmount sum={percentAmount} />}
    />
  );
}
