import React from 'react';

import { Chart, IPoint, Period } from 'components/Chart';

type Props<P extends IPoint> = {
  points: P[];
  lines: Array<keyof P>;
  lineColors?: Partial<Record<keyof P, string>>;
  period?: Period,
};

export function InlineChart<P extends IPoint>(props: Props<P>) {
  const { points, lines, lineColors, period = 'all' } = props;
  return (
    <Chart
      points={points}
      lines={lines}
      lineColors={lineColors}
      period={period}
      xAxisProps={{
        padding: { left: 1, right: 3 },
        tick: false,
        hide: true,
      }}
      yAxisProps={{
        padding: { top: 3, bottom: 1 },
        hide: true,
        tick: false,
        domain: ['dataMin', 'dataMax'],
      }}
    />
  );
}
