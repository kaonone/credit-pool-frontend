import * as React from 'react';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './Preview.style';

interface IProps {
  title: React.ReactNode;
  titleSize?: 'medium' | 'large';
  subtitle?: React.ReactNode;
  description: React.ReactNode;
}

export function Preview(props: IProps) {
  const { title, titleSize = 'medium', description, subtitle } = props;
  const classes = useStyles();

  return (
    <article className={classes.root}>
      <Typography variant="h3" className={cn(classes.title, classes[titleSize])}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" className={classes.subtitle}>
          {subtitle}
        </Typography>
      )}
      <Typography className={classes.description}>{description}</Typography>
    </article>
  );
}
