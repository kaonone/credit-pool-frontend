import * as React from 'react';

import { makeStyles } from 'utils/styles';

type Props = {
  title: NonNullable<React.ReactNode>;
  value: NonNullable<React.ReactNode>;
  subValue?: React.ReactNode;
};

export function Metric(props: Props) {
  const { title, value, subValue } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.value}>{value}</div>
      {subValue && <div className={classes.subValue}>{subValue}</div>}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
    title: {
      fontSize: 16,
    },
    value: {
      marginTop: 13,
      fontSize: 32,
      fontWeight: 300,
      lineHeight: 'normal',
    },
    subValue: {
      marginTop: 8,
      fontSize: 16,
    },
  }),
  { name: 'Metric' },
);
