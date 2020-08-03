import * as React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';

import { ChartMock } from '../ChartMock/ChartMock';
import { ChartProfit } from '../ChartProfit/ChartProfit';

type Props = {
  value?: string;
  variant?: 'decrease' | 'increase';
  sign?: '+' | '-';
};

export function ChartBlock(props: Props) {
  const { variant, value } = props;
  const classes = useStyles();

  return (
    <div className={cn(classes.chartBlock, { [classes.withoutValue]: variant && !value })}>
      <div className={classes.chart}>
        <ChartMock />
      </div>
      {props && <ChartProfit {...props} />}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    chartBlock: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'flex-end',

      '&$withoutValue': {
        flexDirection: 'row-reverse',
      },
    },
    chart: {
      marginLeft: 20,
      marginBottom: 3.5,

      '$withoutValue &, &:only-child': {
        margin: 0,
      },
    },
    withoutValue: {},
  }),
  { name: 'ChartBlock' },
);
