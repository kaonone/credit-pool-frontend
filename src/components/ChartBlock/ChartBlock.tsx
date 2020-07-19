import * as React from 'react';

import { makeStyles } from 'utils/styles';

import { ChartMock } from '../ChartMock/ChartMock';
import { ChartProfit } from '../ChartProfit/ChartProfit';

type Props = {
  value?: string;
  variant?: 'decrease' | 'increase';
  sign?: '+' | '-';
};

export function ChartBlock(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.chartBlock}>
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
      marginLeft: 10,
    },
    chart: {
      marginLeft: 20,
      marginBottom: 10,
    },
  }),
  { name: 'ChartBlock' },
);
