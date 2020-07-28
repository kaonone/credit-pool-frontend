import * as React from 'react';

import { Chart, IPoint, Period } from 'components/Chart';
import { Label } from 'components/Label/Label';

import { PeriodSwitch } from './components/PeriodSwitch/PeriodSwitch';
import { useStyles } from './BalanceChart.style';

interface IProps<P extends IPoint> {
  title: string;
  chartPoints: P[];
  chartLines: Array<keyof P>;
  chartLineColors?: Partial<Record<keyof P, string>>;
  renderCurrentBalance(): React.ReactNode;
}

function BalanceChart<P extends IPoint>(props: IProps<P>) {
  const { title, chartPoints, chartLines, chartLineColors, renderCurrentBalance } = props;
  const classes = useStyles();
  const [period, setPeriod] = React.useState<Period>('all');

  const handlePeriodSwitchSelect = React.useCallback((newPeriod: Period) => {
    setPeriod(newPeriod);
  }, []);

  return (
    <div className={classes.root}>
      <Label>{title}</Label>
      <div className={classes.graphic}>
        <Chart
          points={chartPoints}
          lines={chartLines}
          lineColors={chartLineColors}
          period={period}
          showGrids
        />
      </div>
      <PeriodSwitch period={period} onSelect={handlePeriodSwitchSelect} />
      <div className={classes.balanceValue}>{renderCurrentBalance()}</div>
    </div>
  );
}

export { BalanceChart };
