import * as React from 'react';

import { Metric, Title, FormattedAmount, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { percentAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function AveragePassiveAPY() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Title>{t(tKeys.averagePassiveAPY.getKey())}</Title>}
      value={<FormattedAmount sum={percentAmount} />}
      chart={<ChartBlock />}
    />
  );
}
