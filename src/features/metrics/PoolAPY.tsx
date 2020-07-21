import * as React from 'react';

import { Metric, Label, FormattedAmount, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { percentAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function PoolAPY() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label>{t(tKeys.poolAPY.getKey())}</Label>}
      value={<FormattedAmount sum={percentAmount} />}
      chart={<ChartBlock />}
    />
  );
}
