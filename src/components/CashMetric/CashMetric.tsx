import React from 'react';

import { Metric } from 'components/Metric/Metric';
import { Profit } from 'components/Profit/Profit';
import { formatBalance } from 'utils/format';
import { DEFAULT_DECIMALS } from 'env';

interface IProps {
  title: React.ReactNode;
  value: string;
  symbol: string;
  needed?: string;
  icon?: React.ReactNode;
  profit?: number;
}

function CashMetric(props: IProps) {
  const { title, value, needed, symbol, icon, profit } = props;

  const formattedValue = formatBalance({
    amountInBaseUnits: value,
    baseDecimals: DEFAULT_DECIMALS,
    tokenSymbol: symbol,
  });

  const formattedNeeded =
    needed &&
    `~${formatBalance({
      amountInBaseUnits: needed,
      baseDecimals: DEFAULT_DECIMALS,
      tokenSymbol: symbol,
    })} needed`;

  return (
    <Metric
      title={title}
      value={formattedValue}
      icon={icon}
      subValue={(profit && <Profit value={profit} />) || formattedNeeded}
    />
  );
}

export { CashMetric };
