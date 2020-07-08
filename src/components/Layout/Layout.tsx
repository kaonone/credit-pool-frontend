import React from 'react';
import cn from 'classnames';

import { attachStaticFields } from 'utils/object';

import { AkropolisSocialLinks } from '../AkropolisSocialLinks/AkropolisSocialLinks';
import { useStyles } from './Layout.style';

interface IOwnProps {
  children: React.ReactNode;
}

type IProps = IOwnProps;

function LayoutComponent({ children }: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
      <div className={classes.socials}>
        <AkropolisSocialLinks direction="column" />
      </div>
    </div>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Header({ children, className }: ContainerProps) {
  const classes = useStyles();
  return <div className={cn(className, classes.container, classes.header)}>{children}</div>;
}

function Container({ children, className }: ContainerProps) {
  const classes = useStyles();
  return <div className={cn(className, classes.container)}>{children}</div>;
}

function Footer({ children, className }: ContainerProps) {
  const classes = useStyles();
  return <div className={cn(className, classes.container, classes.footer)}>{children}</div>;
}

export const Layout = attachStaticFields(LayoutComponent, {
  Header,
  Container,
  Footer,
});
