import React, { FunctionComponent } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

import { Amount } from 'model/entities';
import { ICurrency } from 'model/types';

interface IProps {
  sum: Amount<ICurrency>;
  precision?: number;
  className?: string;
  children?: FunctionComponent<{ formattedBalance: string; notRoundedBalance: string }>;
}

function FormattedAmount(props: IProps) {
  const { sum, precision, children, className } = props;
  const formattedBalance = sum.toFormattedString(precision);
  const notRoundedBalance = sum.toFormattedString(sum.currency.decimals);

  return (
    <Tooltip title={notRoundedBalance}>
      <span className={className}>
        {children ? children({ formattedBalance, notRoundedBalance }) : formattedBalance}
      </span>
    </Tooltip>
  );
}

export { FormattedAmount };
