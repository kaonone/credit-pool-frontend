import * as React from 'react';

import { Metric, Label, FormattedAmount, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { PercentAmount } from 'model/entities';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

const tKeys = tKeysAll.components.metrics;

export function MinimumAPY() {
  const { t } = useTranslate();

  const api = useApi();

  const [config] = useSubscribable(() => api.loanModule.getConfig$(), [api]);
  const debtInterestMin = config?.limits.debtInterestMin || '0';
  const minLoanAPR = new PercentAmount(debtInterestMin).div(10);

  return (
    <Loading>
      <Metric
        title={<Label>{t(tKeys.minimumAPY.getKey())}</Label>}
        value={<FormattedAmount sum={minLoanAPR} />}
      />
    </Loading>
  );
}
