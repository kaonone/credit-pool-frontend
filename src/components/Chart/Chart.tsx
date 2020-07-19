import * as React from 'react';
import * as R from 'ramda';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer } from 'recharts';

import { useTheme } from 'utils/styles';

import { PeriodSwitch } from './components/PeriodSwitch/PeriodSwitch';
import { makeFormatDateByPeriod, getTicks, makeGridGenerator } from './helpers';
import { Period, IPoint } from './models';
import { useStyles } from './Chart.style';

interface IProps<P extends IPoint> {
  points: P[];
  lines: Array<keyof P>;
  lineColors?: Partial<Record<keyof P, string>>;
  onPeriodChange?: (firstPoint: P, lastPoint: P, period: string) => any;
}

function Chart<P extends IPoint>(props: IProps<P>) {
  const {
    points,
    lines,
    lineColors = {} as Partial<Record<keyof P, string>>,
    onPeriodChange,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [period, setPeriod] = React.useState<Period>(
    () => getTicks(points, lines, 'all').realPeriod,
  );

  const { ticks, realPeriod } = React.useMemo(() => getTicks(points, lines, period), [
    points,
    lines.toString(),
    period,
  ]);

  const gridGenerator = React.useMemo(() => makeGridGenerator(3), []);

  const firstTick = R.head(ticks);
  const lastTick = R.last(ticks);

  React.useEffect(() => {
    onPeriodChange && firstTick && lastTick && onPeriodChange(firstTick, lastTick, period);
  }, [...Object.values(firstTick || {}), ...Object.values(lastTick || {}), period, onPeriodChange]);
  if (!firstTick) {
    return null;
  }

  const formatTick = React.useMemo(() => makeFormatDateByPeriod(realPeriod, firstTick.date), [
    realPeriod,
    firstTick.date,
  ]);

  const renderTick = React.useCallback(
    ({ x, y, payload, index, visibleTicksCount, width }) => {
      const minTickSpace = realPeriod === 'd' || realPeriod === 'm' ? 110 : 70;
      const maxTicksCount = Math.floor(width / minTickSpace);
      const step = Math.ceil(visibleTicksCount / maxTicksCount) - 1;

      if (index % step !== 0) {
        return null;
      }

      const isFirstTick = index === 0;
      const isLastTick = index === visibleTicksCount - 1;

      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={12}
            textAnchor={(isFirstTick && 'start') || (isLastTick && 'end') || 'middle'}
            className={classes.tick}
          >
            {formatTick(payload.value)}
          </text>
        </g>
      );
    },
    [formatTick, realPeriod, theme],
  );

  return (
    <div className={classes.root}>
      <div className={classes.graphic}>
        <ResponsiveContainer>
          {/* TODO: Fix blank space on left */}
          <LineChart data={ticks} margin={{ left: -55, right: 0, bottom: 0, top: 0 }}>
            <XAxis
              dataKey="date"
              type="number"
              interval={0}
              axisLine={{ stroke: theme.palette.text.primary }}
              domain={[ticks[0].date, ticks[ticks.length - 1].date]}
              allowDataOverflow
              ticks={R.pluck('date', ticks)}
              tickSize={0}
              tick={renderTick}
            />
            <YAxis
              axisLine={{ stroke: theme.palette.text.primary }}
              tick={false}
              padding={{ top: 10, bottom: 1 }}
            />
            <CartesianGrid
              stroke={theme.palette.text.primary}
              strokeOpacity={0.1}
              vertical={false}
              horizontalCoordinatesGenerator={gridGenerator}
            />
            {lines.map(line => (
              <Line
                key={String(line)}
                dataKey={String(line)}
                stroke={lineColors[line] || '#613aaf'}
                type="natural"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <PeriodSwitch period={period} onSelect={setPeriod} />
    </div>
  );
}

export { Chart };
