import React from 'react';

import { ETH_NETWORK_CONFIG } from 'env';
import { Loading, FormattedTokenAmount } from 'components';
import { TokenAmount } from 'model/entities';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { EmptyCell } from './EmptyCell';

type Props = {
  amount: string;
};

export function TotalSumCell({ amount }: Props) {
  const api = useApi();
  // TODO: Add multitoken support
  const [dai, daiMeta] = useSubscribable(() => api.erc20.getToken$(ETH_NETWORK_CONFIG.tokens.dai), [
    api,
  ]);

  if (!dai) {
    return <EmptyCell />;
  }

  const tokenAmount = new TokenAmount(amount, dai);

  return (
    <Loading meta={daiMeta}>
      <FormattedTokenAmount sum={tokenAmount} />
    </Loading>
  );
}
