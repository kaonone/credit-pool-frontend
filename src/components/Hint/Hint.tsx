import React from 'react';
import cn from 'classnames';

import { useStyles } from './Hint.style';

type Props = React.PropsWithChildren<{
  size?: 'small' | 'medium';
  color?: 'error' | 'default';
  position?: 'overlay' | 'default';
}>;

function Hint(props: Props) {
  const { children, size = 'medium', color = 'default', position = 'default' } = props;
  const classes = useStyles();

  const className = cn(
    classes.root,
    {
      [classes.isSmall]: size === 'small',
      [classes.isMedium]: size === 'medium',
    },
    {
      [classes.colorDefault]: color === 'default',
      [classes.colorError]: color === 'error',
    },
    {
      [classes.withOverlay]: position === 'overlay',
    },
  );

  return <div className={className}>{children}</div>;
}

export { Hint };
