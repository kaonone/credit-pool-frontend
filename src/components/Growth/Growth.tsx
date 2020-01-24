import * as React from 'react';
import BN from 'bn.js';

import { Profit } from 'components/Profit/Profit';

interface IProps {
  previous: BN;
  current: BN;
  className?: string;
  format?(value: BN): string;
}

function Growth(props: IProps) {
  const { current, previous, className } = props;

  const growth = previous.isZero()
    ? new BN(0)
    : current
        .sub(previous)
        .div(previous)
        .muln(100);

  return growth.toNumber() ? <Profit value={growth.toNumber()} className={className} /> : null;
}

export { Growth };
