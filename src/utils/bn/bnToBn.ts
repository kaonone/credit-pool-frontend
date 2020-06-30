import BN from 'bn.js';

import { IToBN, isToBN } from 'model/types';

import { isHex } from '../hex/isHex';
import { hexToBn } from '../hex/hexToBn';

export function bnToBn<ExtToBn extends IToBN>(value?: ExtToBn | BN | string | number | null): BN {
  if (!value) {
    return new BN(0);
  }
  if (isHex(value, undefined, true)) {
    return hexToBn(value.toString());
  }

  const convertedToBnValue = isToBN(value) ? value.toBN() : new BN(value);

  return BN.isBN(value) ? value : convertedToBnValue;
}
