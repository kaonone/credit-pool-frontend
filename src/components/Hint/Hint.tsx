import React from 'react';
import cn from 'classnames';

import { useStyles } from './Hint.style';

export type Props = React.PropsWithChildren<{
  size?: 'small' | 'medium';
  color?: 'error' | 'default';
  renderIcon?: () => React.ReactNode;
  renderButton?: () => React.ReactNode;
}>;

function Hint(props: Props) {
  const { children, renderIcon, renderButton, size = 'medium', color = 'default' } = props;
  const classes = useStyles();

  const className = cn(classes.root, {
    [classes.isSmall]: size === 'small',
    [classes.isMedium]: size === 'medium',
    [classes.colorDefault]: color === 'default',
    [classes.colorError]: color === 'error',
    [classes.withButton]: renderButton !== undefined,
  });

  return (
    <div className={className}>
      {children}
      {renderIcon && <div className={classes.icon}>{renderIcon()}</div>}
      {renderButton && <div className={classes.button}>{renderButton()}</div>}
    </div>
  );
}

export { Hint };
