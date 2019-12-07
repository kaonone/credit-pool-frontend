import React, { useCallback } from 'react';
import BN from 'bn.js';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { CashExchangeForm, IFormData } from '../CashExchangeForm/CashExchangeForm';

function CashSellingForm() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.cashExchange.cashSellingForm;

  const convertCash = useCallback((value: string) => {
    return value;
  }, []);

  const handleCashExchangeFormSubmit = useCallback((values: IFormData) => {
    // eslint-disable-next-line no-console
    console.log(`Selling ${values}`);
  }, []);

  return (
    <CashExchangeForm
      title={t(tKeys.title.getKey())}
      maxValue={new BN(1000000000000000)}
      sourceSymbol="PTK"
      targetSymbol="DAI"
      placeholder={t(tKeys.placeholder.getKey())}
      onSubmit={handleCashExchangeFormSubmit}
      convertCash={convertCash}
    />
  );
}

export { CashSellingForm };
