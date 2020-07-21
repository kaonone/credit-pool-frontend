import * as React from 'react';

import { Chart, IPoint } from 'components/Chart';
import { Label } from 'components/Label/Label';

import { useStyles } from './BalanceChart.style';

interface IProps<P extends IPoint> {
  title: string;
  chartPoints: P[];
  chartLines: Array<keyof P>;
  chartLineColors?: Partial<Record<keyof P, string>>;
  renderCurrentBalance(periodInfo: IPeriodInfo<P>): React.ReactNode;
}

export interface IPeriodInfo<P extends IPoint> {
  firstPoint: P;
  lastPoint: P;
  period: string;
}

function BalanceChart<P extends IPoint>(props: IProps<P>) {
  const { title, chartPoints, chartLines, chartLineColors, renderCurrentBalance } = props;
  const classes = useStyles();
  const [periodInfo, setPeriodInfo] = React.useState<IPeriodInfo<P> | null>(null);

  const handleChartPeriodChange = React.useCallback(
    (firstPoint: P, lastPoint: P, period: string) => {
      setPeriodInfo({
        firstPoint,
        lastPoint,
        period,
      });
    },
    [],
  );

  return (
    <div className={classes.root}>
      <Label>{title}</Label>
      <div className={classes.graphic}>
        <Chart
          points={chartPoints}
          lines={chartLines}
          lineColors={chartLineColors}
          onPeriodChange={handleChartPeriodChange}
        />
      </div>
      <div className={classes.balanceValue}>{periodInfo && renderCurrentBalance(periodInfo)}</div>
    </div>
  );
}

export { BalanceChart };
