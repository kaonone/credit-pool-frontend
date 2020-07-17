import * as React from 'react';

import { Metric, Title, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { tokenAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics;

export function ActiveMembers() {
  const { t } = useTranslate();

  return (
    <Metric
      title={<Title>{t(tKeys.activeMembers.getKey())}</Title>}
      value={<FormattedAmount sum={tokenAmount} />}
    />
  );
}
