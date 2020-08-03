import * as React from 'react';

import { Metric, Label, ChartBlock, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { percentAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function AverageLoanAPY() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Label withComingSoon>{t(tKeys.averageLoanAPY.getKey())}</Label>}
      value={<FormattedAmount sum={percentAmount} />}
      chart={<ChartBlock value="0" variant="increase" sign="+" />}
    />
  );
}
