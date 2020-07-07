import * as React from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './Section.style';

interface IProps {
  title?: string;
  titleVariant?: 'h2' | 'h3';
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section(props: IProps) {
  const { title, titleVariant = 'h2', description, children, className } = props;
  const classes = useStyles();
  return (
    <section className={cn(className, classes.root)}>
      {title && (
        <Typography variant={titleVariant} className={cn(classes.title, classes[titleVariant])}>
          {title}
        </Typography>
      )}
      {description && <Typography className={classes.description}>{description}</Typography>}
      {children}
    </section>
  );
}
