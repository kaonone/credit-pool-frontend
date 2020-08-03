import * as React from 'react';

import { Label, FormattedAmount, Metric, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { percentAmount } from 'utils/mock';

import { progressProps } from './common';

type Props = {
  title?: string;
  hint?: string;
};

export function AvgPoolAPYOriginal(props: Props) {
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

export function AvgPoolAPY(props: Props) {
  const { title = 'APY', hint } = props;

  return (
    <Metric
      title={
        <Label hint={hint} withComingSoon>
          {title}
        </Label>
      }
      value={<FormattedAmount sum={percentAmount} />}
    />
  );
}
