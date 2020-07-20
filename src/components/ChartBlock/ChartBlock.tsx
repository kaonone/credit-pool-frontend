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
    <div className={cn(classes.chartBlock, variant && !value && classes.withoutValue)}>
      <div
        className={cn(
          { [classes.chart]: props?.variant },
          variant && !value && classes.withoutValue,
        )}
      >
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
    withoutValue: {},
    chart: {
      marginLeft: 20,

      '&$withoutValue': {
        marginLeft: 0,
      },
    },
  }),
  { name: 'ChartBlock' },
);
