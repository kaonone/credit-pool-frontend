import React, { useMemo } from 'react';

import { makeStyles, useTheme } from 'utils/styles';
import { makeMockedDatePoints } from 'utils/mock';
import { InlineChart } from 'components/InlineChart/InlineChart';

export function ChartMock() {
  const classes = useStyles();
  const theme = useTheme();

  const points = useMemo(() => makeMockedDatePoints(), []);

  return (
    <div className={classes.root}>
      <div className={classes.hidden}>
        <svg>{theme.gradients.linearChart[0].svgLinear('userBalanceChart')}</svg>
      </div>
      <div className={classes.chart}>
        <InlineChart
          points={points}
          lines={['value']}
          lineColors={{ value: 'url(#userBalanceChart)' }}
          period="w"
        />
      </div>
    </div>
  );
}

const chartHeight = 16;

const useStyles = makeStyles(
  () => ({
    root: {},
    hidden: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    chart: {
      width: 54,
      height: chartHeight,
      marginTop: -chartHeight, // Hint to fix recharts svg surface vertical shift
      marginBottom: chartHeight,
    },
  }),
  { name: 'ChartMock' },
);
