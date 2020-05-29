import BN from 'bn.js';

import { tKeys } from 'services/i18n';

export const validatePositiveNumber = (value: BN) => {
  const isValid = !value.isNeg();
  return isValid ? undefined : tKeys.utils.validation.isPositiveNumber.getKey();
};
