import * as React from 'react';

import { Metric, Label, FormattedAmount, BarChart, ComingSoon } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { percentAmount, barChartData } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function LoanApprovalRatio() {
  const { t } = useTranslate();

  return (
    <div style={{ position: 'relative' }}>
      <ComingSoon position="overlay" />
      <Metric
        title={<Label>{t(tKeys.loanApprovalRatio.getKey())}</Label>}
        value={<FormattedAmount sum={percentAmount} />}
        chart={<BarChart values={barChartData} />}
      />
    </div>
  );
}
