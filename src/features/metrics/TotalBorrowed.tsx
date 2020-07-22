import * as React from 'react';
import BN from 'bn.js';

import { Metric, Label, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { ETH_NETWORK_CONFIG } from 'env';
import { TokenAmount } from 'model/entities';

const tKeys = tKeysAll.components.metrics;

export function TotalBorrowed() {
  const { t } = useTranslate();

  const api = useApi();

  const [totalDebts] = useSubscribable(() => api.loanModule.getTotalLDebts$(), [api], new BN(0));

  const [pToken] = useSubscribable(() => api.erc20.getToken$(ETH_NETWORK_CONFIG.contracts.dai), [
    api,
  ]);

  return (
    <Metric
      title={<Label>{t(tKeys.totalBorrowed.getKey())}</Label>}
      value={pToken ? <FormattedAmount sum={new TokenAmount(totalDebts, pToken)} /> : 'Not found'}
    />
  );
}
