import React from 'react';

import { Metric } from 'components/Metric/Metric';
import { Profit } from 'components/Profit/Profit';
import { FormattedBalance } from 'components/FormattedBalance/FormattedBalance';
import { Token } from 'model/types';

export interface ICashMetricProps {
  title: React.ReactNode;
  value: string;
  token: Token;
  needed?: string;
  icon?: React.ReactNode;
  profit?: number;
}

function CashMetric(props: ICashMetricProps) {
  const { title, value, needed, token, icon, profit } = props;

  return (
    <Metric
      title={title}
      value={<FormattedBalance sum={value} token={token} />}
      icon={icon}
      subValue={
        (profit && <Profit value={profit} />) ||
        (needed && (
          <>
            ~<FormattedBalance sum={needed} token={token} /> needed
          </>
        ))
      }
    />
  );
}

export { CashMetric };
