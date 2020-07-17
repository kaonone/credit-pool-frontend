import * as React from 'react';

import { Metric, Title, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics.myBalance;

export function MyBalance() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Title hint={t(tKeys.description.getKey())}>{t(tKeys.myBalance.getKey())}</Title>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
