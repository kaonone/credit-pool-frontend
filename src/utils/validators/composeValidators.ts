import { ITranslateKey } from 'services/i18n';

type Validator<T> = (value: T) => string | ITranslateKey | undefined;

export function composeValidators<T>(...validators: Array<Validator<T>>) {
  return (value: T) =>
    validators.reduce<string | ITranslateKey | undefined>(
      (error, validator) => error || validator(value),
      undefined,
    );
}
