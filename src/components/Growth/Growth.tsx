import * as React from 'react';
import BN from 'bn.js';

import { calculateGrowth } from 'utils/bn';
import { Profit } from 'components/Profit/Profit';

interface IProps {
  previous: BN;
  current: BN;
  className?: string;
  calculate?(previous: BN, current: BN): BN;
  format?(value: BN): string;
}

function Growth(props: IProps) {
  const { current, previous, calculate, className } = props;
  const growth = (calculate || calculateGrowth)(previous, current);

  return <Profit value={growth.toNumber()} className={className} />;
}

export { Growth };
