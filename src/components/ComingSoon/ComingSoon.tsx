import * as React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';

type Props = {
  variant?: 'label' | 'default';
};

export function ComingSoon(props: Props) {
  const classes = useStyles();
  const { variant = 'default' } = props;

  return (
    <div
      className={cn(classes.root, {
        [classes.isLabel]: variant === 'label',
      })}
    >
      <span className={classes.text}>Coming soon</span>
    </div>
  );
}

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      background: theme.palette.background.hint,
      borderRadius: 4,
    },
    isLabel: {
      minWidth: 86,
      padding: '6px 8px',
      borderRadius: 12.5,

      '& $text': {
        fontSize: 12,
        lineHeight: 1.1,
        fontWeight: 300,
        fontStyle: 'italic',
      },
    },
    text: {
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'ComingSoon' },
);
