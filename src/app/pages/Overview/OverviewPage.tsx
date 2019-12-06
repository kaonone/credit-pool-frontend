import * as React from 'react';

import { Hint, Grid, PersonalInformation } from 'components';

export function OverviewPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Hint>Co-op Balance coming soon</Hint>
      </Grid>
      <Grid item xs={4}>
        <Hint>PTK Price coming soon</Hint>
      </Grid>
      <Grid item xs={4}>
        <PersonalInformation />
      </Grid>
    </Grid>
  );
}
