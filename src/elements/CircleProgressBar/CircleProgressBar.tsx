import * as React from 'react';
import cn from 'classnames';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { Omit } from '_helpers';

import { useStyles } from './CircleProgressBar.style';

type IProps = Omit<CircularProgressProps, 'classes'>;

function CircleProgressBar(props: IProps) {
  const { className, size, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={cn(classes.root, className)}>
      <CircularProgress className={classes.overlay} variant="determinate" size={size} value={100} />
      <CircularProgress className={classes.progress} {...rest} />
    </div>
  );
}

export { CircleProgressBar };
