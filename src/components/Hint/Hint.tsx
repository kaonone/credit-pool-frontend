import React from 'react';
import cn from 'classnames';

import { useStyles } from './Hint.style';

type Props = React.PropsWithChildren<{
  size?: 'small' | 'medium';
  className?: string;
}>;

function Hint(props: Props) {
  const { children, size = 'medium', className: customClassName } = props;
  const classes = useStyles();

  const className = cn(classes.root, {
    [classes.isSmall]: size === 'small',
    [classes.isMedium]: size === 'medium',
    customClassName,
  });

  return <div className={className}>{children}</div>;
}

export { Hint };
