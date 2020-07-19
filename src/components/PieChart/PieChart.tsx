import * as React from 'react';
import * as R from 'ramda';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { useTheme, makeStyles } from 'utils/styles';

export type Sector = {
  value: number;
  label: string;
};

export type Props = {
  chartData: Sector[];
  sectorColors: string[];
  withBackground?: boolean;
};

function PieChart(props: Props & Partial<React.ComponentProps<typeof Pie>>) {
  const theme = useTheme();
  const classes = useStyles();

  const { chartData, sectorColors, withBackground, innerRadius = '90%', ...rest } = props;

  return (
    <ResponsiveContainer>
      <RechartsPieChart className={classes.root}>
        {withBackground && (
          <Pie
            {...rest}
            className={classes.backgroundPath}
            data={[{ value: R.sum(R.pluck('value', chartData)) }]}
            innerRadius={innerRadius}
            outerRadius="100%"
            cornerRadius="50%"
            dataKey="value"
            isAnimationActive={false}
            stroke="none"
          />
        )}
        <Pie
          {...rest}
          data={chartData}
          innerRadius={innerRadius}
          outerRadius="100%"
          cornerRadius="50%"
          dataKey="value"
          isAnimationActive={false}
          stroke="none"
        >
          {chartData.map(({ label }, index) => (
            <Cell
              key={label}
              fill={sectorColors[index] || theme.palette.primary.main}
              stroke="none"
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

const useStyles = makeStyles(
  theme => ({
    root: {},
    backgroundPath: {
      '& path': {
        fill: theme.palette.background.default,
      },
    },
  }),
  { name: 'PieChart' },
);

export { PieChart };
