import BN from 'bn.js';

import { bnToBn } from 'utils/bn';
import { IToBN } from 'model/types';

import { formatInteger } from './formatInteger';

export function formatNumber<ExtToBn extends IToBN>(value?: ExtToBn | BN | number | null): string {
  return formatInteger(bnToBn(value).toString());
}
