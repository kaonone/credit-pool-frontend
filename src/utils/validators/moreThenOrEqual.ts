import { tKeys, ITranslateKey } from 'services/i18n';

export function moreThenOrEqual(value: number, currentValue: number): ITranslateKey | undefined {
  return currentValue >= value
    ? undefined
    : {
        key: tKeys.utils.validation.moreThenOrEqual.getKey(),
        params: { value },
      };
}
