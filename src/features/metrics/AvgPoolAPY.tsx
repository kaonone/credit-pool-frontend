import * as React from 'react';

import { Label, FormattedAmount, Metric, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { progressProps } from './common';

const tKeys = tKeysAll.components.metrics.apy;

export function AvgPoolAPY() {
  const { t } = useTranslate();

  const api = useApi();
  const [avgPoolAPY, avgPoolAPYMeta] = useSubscribable(() => api.defiModule.getAvgPoolAPY$(), [
    api,
  ]);

  return (
    <Metric
      title={<Label hint={t(tKeys.description.getKey())}>APY</Label>}
      value={
        <Loading meta={avgPoolAPYMeta} progressProps={progressProps}>
          {avgPoolAPY && <FormattedAmount sum={avgPoolAPY} />}
        </Loading>
      }
    />
  );
}
