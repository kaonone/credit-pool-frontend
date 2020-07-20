import * as React from 'react';

import { PieChart } from 'components/PieChart/PieChart';
import { useTheme } from 'utils/styles';

import { useStyles } from './ProgressChart.style';

type Props = {
  value: number;
  total: number;
  label?: string;
  withLabels?: boolean;
  renderTitle?: () => {};
};

const createDataEntry = (value: number, label: string) => ({ value, label });

function ProgressChart(props: Props & Partial<React.ComponentProps<typeof PieChart>>) {
  const classes = useStyles();
  const theme = useTheme();

  const {
    value,
    total,
    label,
    withLabels,
    renderTitle,
    startAngle = 180,
    endAngle = 0,
    ...rest
  } = props;

  const chartData = React.useMemo(() => {
    return [createDataEntry(value, label || 'progress'), createDataEntry(total - value, 'rest')];
  }, [value, total]);

  return (
    <div className={classes.root}>
      <div className={classes.hidden}>
        <svg>{theme.gradients.progressChart.svgLinear('progressChartGradient')}</svg>
      </div>
      <div className={classes.chart}>
        <PieChart
          {...rest}
          chartData={chartData}
          sectorColors={['url(#progressChartGradient)', 'transparent']}
          startAngle={startAngle}
          endAngle={endAngle}
          withBackground
        />
      </div>
      {renderTitle !== undefined && <div className={classes.title}>{renderTitle()}</div>}
    </div>
  );
}

export { ProgressChart };
