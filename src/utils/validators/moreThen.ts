import BN from 'bn.js';

import { tKeys, ITranslateKey } from 'services/i18n';

type FormatValue = (value: number | BN) => string;

export function moreThen(
  value: BN,
  currentValue: BN,
  formatValue?: FormatValue | undefined,
): ITranslateKey | undefined {
  const isValid = value.lt(new BN(currentValue));

  return isValid
    ? undefined
    : {
        key: tKeys.utils.validation.moreThen.getKey(),
        params: { value: formatValue ? formatValue(value) : String(value) },
      };
}
