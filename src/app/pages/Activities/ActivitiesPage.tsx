import * as React from 'react';

import { ActivitiesCard, Grid } from 'components';

export function ActivitiesPage() {
  const expansionPanelDetails =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti alias aut ab placeat exercitationem minus illo repudiandae molestias delectus perferendis harum qui quis, quasi vero mollitia rem, temporibus odio excepturi?';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ActivitiesCard
          lendValue="120000000000000000"
          address="0x0000000000000000000000000000000000000000000000000000000000000000"
          aprValue={15.8}
          stakedValue="170000000000000000"
          neededValue="250000000000000000"
          progress={85}
          timeLeft={15}
          expansionPanelDetails={expansionPanelDetails}
          status="PENDING"
        />
      </Grid>
      <Grid item xs={12}>
        <ActivitiesCard
          lendValue="120000000000000000"
          address="0x0000000000000000000000000000000000000000000000000000000000000000"
          aprValue={15.8}
          stakedValue="170000000000000000"
          neededValue="250000000000000000"
          progress={85}
          timeLeft={15}
          expansionPanelDetails={expansionPanelDetails}
          status="APPROVED"
        />
      </Grid>
      <Grid item xs={12}>
        <ActivitiesCard
          lendValue="120000000000000000"
          address="0x0000000000000000000000000000000000000000000000000000000000000000"
          aprValue={15.8}
          stakedValue="170000000000000000"
          neededValue="250000000000000000"
          progress={85}
          timeLeft={15}
          expansionPanelDetails={expansionPanelDetails}
          status="DECLINED"
        />
      </Grid>
    </Grid>
  );
}
