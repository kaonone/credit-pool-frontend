import React from 'react';

import { Typography, Badge } from 'components';

import { useStyles } from './LoansTitle.style';

interface IProps {
  title: string;
}

function LoansTitle(props: IProps) {
  const { title } = props;
  const classes = useStyles();

  return (
    <Typography component="span" variant="subtitle1" className={classes.title}>
      {title}
    </Typography>
  );
}

export { LoansTitle };
