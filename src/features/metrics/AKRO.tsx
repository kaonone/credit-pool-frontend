import * as React from 'react';

import { AKROIcon } from 'components/icons';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Title, FormattedAmount, Metric } from 'components';
import { tokenAmount, liquidityAmount } from 'utils/mock';

const tKeys = tKeysAll.components.metrics.akro;

export function AKRO() {
  const { t } = useTranslate();

  return (
    <Metric
      title={
        <Title hint={t(tKeys.description.getKey())} icon={<AKROIcon />}>
          AKRO
        </Title>
      }
      value={<FormattedAmount sum={tokenAmount} hideSymbol />}
      subValue={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
