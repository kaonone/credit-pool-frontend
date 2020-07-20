import React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { ProfitArrow } from 'components/icons';

interface IProps {
  value?: string;
  variant?: 'decrease' | 'increase';
  sign?: '+' | '-';
}

function ChartProfit(props: IProps) {
  const { value, variant, sign } = props;
  const classes = useStyles();

  return value || variant ? (
    <span className={cn(classes.root, variant && classes[variant])}>
      {variant && <ProfitArrow className={cn(classes.icon, classes[variant])} />}
      {sign && sign}
      {value && `${value}%`}
    </span>
  ) : null;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
  },

  icon: {
    fontSize: 12,
    marginRight: 5,

    '&$increase': {
      color: theme.colors.shamrock,
    },

    '&$decrease': {
      color: theme.colors.geraldine,
      transform: 'rotate(180deg)',
    },
  },

  increase: {},

  decrease: {},
}));

export { ChartProfit };
