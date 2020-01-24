import * as React from 'react';
import BN from 'bn.js';

import { Profit } from 'components/Profit/Profit';
import { formatBalance } from 'utils/format';

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
        .muln(10000)
        .div(previous);

  const formattedGrowth = formatBalance({
    amountInBaseUnits: growth,
    baseDecimals: 2,
  });

  return growth.toNumber() ? (
    <Profit value={Number(formattedGrowth)} className={className} />
  ) : null;
}

export { Growth };
