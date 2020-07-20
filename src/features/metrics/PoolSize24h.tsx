import * as React from 'react';

import { Metric, Label, FormattedAmount, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function PoolSize24h() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label>{t(tKeys.dayChange.getKey())}</Label>}
      value={<FormattedAmount hasSign sum={liquidityAmount} />}
      chart={<ChartBlock value="1234" variant="decrease" sign="+" />}
    />
  );
}
