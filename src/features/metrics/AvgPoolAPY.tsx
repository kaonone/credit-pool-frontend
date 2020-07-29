import * as React from 'react';

import { Label, FormattedAmount, Metric, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { progressProps } from './common';

type Props = {
  title?: string;
  hint?: string;
};

export function AvgPoolAPY(props: Props) {
  const { title = 'APY', hint } = props;

  const api = useApi();
  const [avgPoolAPY, avgPoolAPYMeta] = useSubscribable(() => api.defiModule.getAvgPoolAPY$(), [
    api,
  ]);

  return (
    <Metric
      title={<Label hint={hint}>{title}</Label>}
      value={
        <Loading meta={avgPoolAPYMeta} progressProps={progressProps}>
          {avgPoolAPY && <FormattedAmount sum={avgPoolAPY} />}
        </Loading>
      }
    />
  );
}
