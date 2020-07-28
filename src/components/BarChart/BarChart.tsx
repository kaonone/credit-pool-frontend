import * as React from 'react';
import { makeStyles } from 'utils/styles';
import { PercentAmount } from 'model/entities';

type Props = {
  values: PercentAmount[];
  fillColor?: string;
};

export function BarChart(props: Props) {
  const { values, fillColor } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {values.map(value => (
        <div className={classes.bar}>
          <div
            className={classes.filledValue}
            style={{ background: fillColor, height: `${value}%` }}
          />
        </div>
      ))}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'inline-flex',
  },
  bar: {
    position: 'relative',
    width: 4,
    background: theme.palette.background.default,
    borderRadius: 2,

    '& + &': {
      marginLeft: 12,
    },
  },
  filledValue: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 6,
    borderRadius: 4,
    transform: 'translateX(-50%)',
    background: theme.gradients.linearChart[1].linear('to left'),
  },
}));
