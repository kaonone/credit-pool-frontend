import * as React from 'react';

import { Metric, Label, FormattedAmount, ChartBlock } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { PercentAmount } from 'model/entities';
import { Fraction } from 'model/entities/Fraction';

const tKeys = tKeysAll.components.metrics;

export function MinimumAPY() {
  const { t } = useTranslate();
  const api = useApi();

  const [loanConfig] = useSubscribable(() => api.loanModule.getConfig$(), [api]);

  return (
    <Metric
      title={<Label>{t(tKeys.minimumAPY.getKey())}</Label>}
      value={
        loanConfig ? (
          <FormattedAmount
            sum={
              new PercentAmount(
                new Fraction(
                  loanConfig.limits.debtInterestMin
                    .muln(100)
                    .div(loanConfig.debtInterestMultiplier),
                ),
              )
            }
          />
        ) : (
          'Not found'
        )
      }
      chart={<ChartBlock />}
    />
  );
}
