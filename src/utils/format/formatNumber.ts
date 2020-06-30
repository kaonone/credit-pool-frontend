import BN from 'bn.js';

import { bnToBn } from 'utils/bn';
import { IToBN } from 'model/types';

import { formatDecimal } from './formatDecimal';

export function formatNumber<ExtToBn extends IToBN>(value?: ExtToBn | BN | number | null): string {
  return formatDecimal(bnToBn(value).toString());
}
