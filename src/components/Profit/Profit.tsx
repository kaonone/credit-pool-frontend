import React from 'react';
import CallMadeIcon from '@material-ui/icons/CallMade';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './Profit.style';

interface IProps {
  value: React.ReactNode;
}

function Profit(props: IProps) {
  const { value } = props;
  const classes = useStyles();

  return (
    <div>
      <CallMadeIcon className={classes.icon} />
      <Typography variant="h6" component="span" className={classes.value}>
        {`${value}%`}
      </Typography>
    </div>
  );
}

export { Profit };
