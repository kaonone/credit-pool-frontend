import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { Hint } from '../Hint/Hint';

type Props = {
  position?: 'overlay' | 'default';
};

export function ComingSoon({ position }: Props) {
  return (
    <Hint position={position}>
      <Typography variant="h4" component="span">
        Coming soon
      </Typography>
    </Hint>
  );
}
