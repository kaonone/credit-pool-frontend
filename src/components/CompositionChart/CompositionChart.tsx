import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { PieChart, Props as PieChartProps } from 'components/PieChart/PieChart';
import { makeStyles } from 'utils/styles';

type Props = {
  title: string;
};

const CHART_SIZE = 135;

function CompositionChart({
  title,
  sectorColors,
  labelColors,
  sectors,
}: Props & Omit<PieChartProps, 'size'>) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <div className={classes.chart}>
          <PieChart
            sectors={sectors}
            sectorColors={sectorColors}
            size={CHART_SIZE}
            labelColors={labelColors}
          />
        </div>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    marginTop: 25,
  },
}));

export { CompositionChart };
