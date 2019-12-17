import React from 'react';
import cn from 'classnames';
import CallMadeIcon from '@material-ui/icons/CallMade';

import { useStyles } from './Profit.style';

interface IProps {
  value: React.ReactNode;
  className?: string;
}

function Profit(props: IProps) {
  const { value, className } = props;
  const classes = useStyles();

  return (
    <span className={cn(classes.root, className)}>
      <CallMadeIcon className={classes.icon} />
      {`${value}%`}
    </span>
  );
}

export { Profit };
