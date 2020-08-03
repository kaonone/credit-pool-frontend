import React from 'react';
import { Link } from 'react-router-dom';
import MuiLink, { LinkProps } from '@material-ui/core/Link';

import { IMenuItem } from 'utils/types/common';

interface Props {
  color?: LinkProps['color'];
  underline?: LinkProps['underline'];
  className?: string;
  onClick?(): void;
}

export function NavMenuItem(props: IMenuItem & Props) {
  const {
    title,
    className,
    isExternal,
    path,
    scrollTo,
    disabled,
    onClick,
    color,
    underline,
  } = props;

  if (disabled) {
    return <span className={className}>{title}</span>;
  }

  const commonProps = {
    className,
    color,
    onClick,
  };

  return isExternal ? (
    <MuiLink
      {...commonProps}
      underline={underline}
      href={path}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </MuiLink>
  ) : (
    <MuiLink
      {...commonProps}
      underline={underline}
      component={Link}
      to={{ pathname: path, hash: scrollTo }}
    >
      {title}
    </MuiLink>
  );
}
