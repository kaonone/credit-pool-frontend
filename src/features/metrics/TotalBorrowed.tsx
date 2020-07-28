import * as React from 'react';
import BN from 'bn.js';

import { Metric, Label, FormattedAmount, Loading } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { usePoolInfo } from 'features/poolInfo';
import { LiquidityAmount, Currency } from 'model/entities';

import { progressProps } from './common';

const tKeys = tKeysAll.components.metrics;

export function TotalBorrowed() {
  const { t } = useTranslate();

  const { lDebt, gqlResult } = usePoolInfo();
  const value = new LiquidityAmount(new BN(lDebt), new Currency('$', 18));

  return (
    <Metric
      title={<Label>{t(tKeys.totalBorrowed.getKey())}</Label>}
      value={
        <Loading gqlResults={gqlResult} progressProps={progressProps}>
          <FormattedAmount sum={value} />
        </Loading>
      }
    />
  );
}
