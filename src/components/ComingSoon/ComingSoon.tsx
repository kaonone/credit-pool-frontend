import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { Hint } from '../Hint/Hint';

export function ComingSoon() {
  return (
    <Hint position="overlay">
      <Typography variant="h4" component="span">
        Coming soon
      </Typography>
    </Hint>
  );
}
