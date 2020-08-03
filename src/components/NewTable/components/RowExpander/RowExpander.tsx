import * as React from 'react';
import Button from '@material-ui/core/Button';
import cn from 'classnames';

import { Arrow } from './icons';
import { useStyles } from './RowExpander.style';

type Props = {
  expanded: boolean;
  onToggle(newValue: boolean): void;
};

export const RowExpander: React.FC<Props> = props => {
  const { expanded, onToggle } = props;

  const classes = useStyles();

  return (
    <Button
      className={cn({
        [classes.root]: true,
        [classes.expanded]: expanded,
      })}
      onClick={() => onToggle(!expanded)}
    >
      <Arrow />
    </Button>
  );
};
