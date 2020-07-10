import * as React from 'react';

import { Button } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

import { Decimal } from './Decimal';
import { Metric } from './Metric';

type Props = {
  decimal: Decimal;
  onDepositClick(): void;
};

const tKeys = tKeysAll.components.metrics.myBalance;

export function MyBalance(props: Props) {
  const { decimal, onDepositClick } = props;
  const { t } = useTranslate();

  return (
    <Metric
      title={t(tKeys.myBalance.getKey())}
      titleDescription={t(tKeys.description.getKey())}
      content={<Decimal decimal={decimal} currency={<>&#36;</>} />}
      button={
        <Button variant="contained" color="primary" type="submit" onClick={onDepositClick}>
          {t(tKeys.deposit.getKey())}
        </Button>
      }
    />
  );
}
