import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import BN from 'bn.js';
import cn from 'classnames';

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
  hasSign?: boolean;
  theme?: 'plain' | 'default';
}

const percentPrecision = 5;

function FormattedAmount(props: IProps) {
  const { sum, hideSymbol, precision = 2, className, hasSign = false, theme = 'default' } = props;
  const formattedBalance = sum.toFormattedString(precision);
  const notRoundedBalance = sum.toFormattedString(
    sum instanceof PercentAmount ? percentPrecision : sum.currency.decimals,
  );
  const needToRenderPlus = hasSign && sum.gt(0);

  return (
    <Tooltip title={notRoundedBalance}>
      <span className={className}>
        {(sum instanceof LiquidityAmount &&
          renderLiquidityAmount(sum, precision, hideSymbol, needToRenderPlus, theme)) ||
          (sum instanceof TokenAmount &&
            renderTokenAmount(sum, precision, hideSymbol, needToRenderPlus)) ||
          (sum instanceof PercentAmount &&
            renderPercentAmount(sum, precision, needToRenderPlus, theme)) ||
          formattedBalance}
      </span>
    </Tooltip>
  );
}

function renderLiquidityAmount(
  sum: LiquidityAmount,
  precision: number,
  hideSymbol: boolean | undefined,
  needToRenderPlus: boolean,
  theme: 'plain' | 'default',
) {
  const decimal = getDecimal(
    (sum.isNeg() ? sum.mul(new BN(-1)) : sum).toString(),
    sum.currency.decimals,
    precision,
  );

  return (
    <>
      {(sum.isNeg() && '-') || (needToRenderPlus && '+')}
      {!hideSymbol && sum.currency.symbol}
      <Decimal decimal={decimal} theme={theme} />
    </>
  );
}

function renderTokenAmount(
  sum: TokenAmount,
  precision: number,
  hideSymbol: boolean | undefined,
  needToRenderPlus: boolean,
) {
  const decimal = getDecimal(
    (sum.isNeg() ? sum.mul(new BN(-1)) : sum).toString(),
    sum.currency.decimals,
    precision,
  );

  return (
    <>
      {(sum.isNeg() && '-') || (needToRenderPlus && '+')}
      <Decimal decimal={decimal} />
      {!hideSymbol && <>&nbsp;{sum.currency.symbol}</>}
    </>
  );
}

function renderPercentAmount(
  sum: PercentAmount,
  precision: number,
  needToRenderPlus: boolean,
  theme: 'plain' | 'default',
) {
  const classes = useStyles();

  return (
    <span className={cn({ [classes.percentRoot]: theme === 'default' })}>
      {(sum.isNeg() && '-') || (needToRenderPlus && '+')}
      {(sum.isNeg() ? sum.mul(new BN(-1)) : sum).toFormattedString(precision, false)}
      <span className={classes.percentSymbol}>{sum.currency.symbol}</span>
    </span>
  );
}

const useStyles = makeStyles(
  {
    percentRoot: {
      display: 'flex',
      flexWrap: 'nowrap',
      lineHeight: 'normal',

      '& $percentSymbol': {
        fontSize: '0.5em',
        paddingLeft: 2,
        lineHeight: '1.8em',
      },
    },

    percentSymbol: {},
  },
  { name: 'FormattedAmount' },
);

export { FormattedAmount };
