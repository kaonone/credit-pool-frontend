import React from 'react';

import { Typography, Badge } from 'components';

import { useStyles } from './LoansTitle.style';

interface IProps {
  title: string;
  amount: number;
}

function LoansTitle(props: IProps) {
  const { title, amount } = props;
  const classes = useStyles();

  return (
    <Badge className={classes.badge} badgeContent={amount} color="primary">
      <Typography component="span" variant="subtitle1" className={classes.title}>
        {title}
      </Typography>
    </Badge>
  );
}

export { LoansTitle };
