import BN from 'bn.js';

import { tKeys, ITranslateKey } from 'services/i18n';

export function moreThenOrEqual(
  value: BN,
  currentValue: BN,
  formatValue?: (value: BN) => string,
): ITranslateKey | undefined {
  const isValid = value.lte(new BN(currentValue));

  return isValid
    ? undefined
    : {
        key: tKeys.utils.validation.moreThenOrEqual.getKey(),
        params: { value: formatValue ? formatValue(value) : String(value) },
      };
}
