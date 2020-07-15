import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

import { Amount, LiquidityAmount, TokenAmount, PercentAmount } from 'model/entities';
import { ICurrency } from 'model/types';
import { getDecimal } from 'utils/format';
import { makeStyles } from 'utils/styles';

import { Decimal } from './Decimal';

interface IProps {
  sum: Amount<ICurrency>;
  precision?: number;
  hideSymbol?: boolean;
  className?: string;
}

function FormattedAmount(props: IProps) {
  const { sum, hideSymbol, precision = 2, className } = props;
  const formattedBalance = sum.toFormattedString(precision);
  const notRoundedBalance = sum.toFormattedString(sum.currency.decimals);

  return (
    <Tooltip title={notRoundedBalance}>
      <span className={className}>
        {(sum instanceof LiquidityAmount && renderLiquidityAmount(sum, precision, hideSymbol)) ||
          (sum instanceof TokenAmount && renderTokenAmount(sum, precision, hideSymbol)) ||
          (sum instanceof PercentAmount && renderPercentAmount(sum, precision)) ||
          formattedBalance}
      </span>
    </Tooltip>
  );
}

function renderLiquidityAmount(
  sum: LiquidityAmount,
  precision: number,
  hideSymbol: boolean | undefined,
) {
  const decimal = getDecimal(sum.toString(), sum.currency.decimals, precision);

  return (
    <>
      {!hideSymbol && sum.currency.symbol}
      <Decimal decimal={decimal} />
    </>
  );
}

function renderTokenAmount(sum: TokenAmount, precision: number, hideSymbol: boolean | undefined) {
  const decimal = getDecimal(sum.toString(), sum.currency.decimals, precision);

  return (
    <>
      <Decimal decimal={decimal} />
      {!hideSymbol && <>&nbsp;{sum.currency.symbol}</>}
    </>
  );
}

function renderPercentAmount(sum: PercentAmount, precision: number) {
  const classes = useStyles();

  return (
    <span className={classes.percentRoot}>
      {sum.toFormattedString(precision, false)}
      <span className={classes.percentSymbol}>{sum.currency.symbol}</span>
    </span>
  );
}

const useStyles = makeStyles({
  percentRoot: {
    display: 'flex',
    flexWrap: 'nowrap',
    lineHeight: 'normal',
  },

  percentSymbol: {
    fontSize: '0.5em',
    paddingLeft: 2,
    lineHeight: '1.8em',
  },
});

export { FormattedAmount };
