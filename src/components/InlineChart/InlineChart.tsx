import React from 'react';

import { Chart, IPoint } from 'components/Chart';

type Props<P extends IPoint> = {
  points: P[];
  lines: Array<keyof P>;
  lineColors?: Partial<Record<keyof P, string>>;
};

export function InlineChart<P extends IPoint>(props: Props<P>) {
  const { points, lines, lineColors } = props;
  return (
    <Chart
      points={points}
      lines={lines}
      lineColors={lineColors}
      period="all"
      xAxisProps={{
        padding: { left: 0, right: 3 },
        tick: false,
        hide: true,
      }}
      yAxisProps={{
        padding: { top: 3, bottom: 0 },
        hide: true,
        tick: false,
        domain: ['dataMin', 'dataMax'],
      }}
    />
  );
}
