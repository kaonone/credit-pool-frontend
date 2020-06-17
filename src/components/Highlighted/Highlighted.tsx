import * as React from 'react';
import cn from 'classnames';

import { colors, makeStyles, lighten, darken } from 'utils/styles';

export const useStyles = makeStyles(theme => {
  return {
    root: {
      border: '1px solid',
      padding: '0.1em',
      borderRadius: 6,
    },
    positive: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? darken(lighten(colors.apple, 0.75), 0.6)
          : lighten(colors.apple, 0.75),
      borderColor:
        theme.palette.type === 'dark'
          ? darken(lighten(colors.apple, 0.4), 0.3)
          : lighten(colors.apple, 0.4),
    },
    negative: {
      backgroundColor: lighten(colors.persianRed, 0.75),
      borderColor: lighten(colors.persianRed, 0.4),
    },
  };
});

interface IProps {
  color: 'positive' | 'negative';
  children: React.ReactNode;
}

export function Highlighted(props: IProps) {
  const { children, color } = props;
  const classes = useStyles();

  return <span className={cn(classes.root, classes[color])}>{children}</span>;
}
