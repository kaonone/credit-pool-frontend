import * as React from 'react';
import * as R from 'ramda';
import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

import { useTheme } from 'utils/styles';

import { useStyles } from './PieChart.style';

export type Sector = {
  value: number;
  label: string;
};

export type Props = {
  sectors: Sector[];
  sectorColors: string[];
  labelColors?: string[];
  size: number;
};

function PieChart(props: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const { sectors, sectorColors, size, labelColors } = props;

  const sortedData = React.useMemo(() => {
    const sortByValue = R.descend(R.prop('value'));
    return R.sort(sortByValue, sectors);
  }, [sectors]);

  return (
    <div className={classes.root}>
      <RechartsPieChart height={size} width={size}>
        <Pie
          data={sortedData}
          innerRadius="90%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          cornerRadius="50%"
          paddingAngle={5}
          dataKey="value"
          isAnimationActive={false}
          stroke="#0a0a0e"
          legendType="square"
        >
          {sortedData.map(({ label }, index) => (
            <Cell
              key={label}
              fill={sectorColors[index] || theme.palette.primary.main}
              stroke="none"
            />
          ))}
        </Pie>
      </RechartsPieChart>
      <ul className={classes.legend}>
        {sortedData.map(({ label, value }, index) => (
          <li
            className={classes.legendItem}
            key={label}
            style={{ color: (labelColors && labelColors[index]) || sectorColors[index] }}
          >
            <span className={classes.label}>
              {`${value}%`}&nbsp;{label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { PieChart };
