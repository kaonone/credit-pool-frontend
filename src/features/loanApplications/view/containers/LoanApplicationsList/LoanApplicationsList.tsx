import * as React from 'react';

import { Grid } from 'components';

import { LoanApplicationCard } from '../../components/LoanApplicationCard/LoanApplicationCard';

interface Activity {
  lendValue: string;
  address: string;
  aprValue: number;
  stakedValue: string;
  neededValue: string;
  progressInPercents: number;
  timeLeft: number;
  expansionPanelDetails: string;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
}

const activities: Activity[] = [
  {
    lendValue: '120000000000000000',
    address: '0x0000000000000000000000000000000000000000000000000000000000000000',
    aprValue: 15.8,
    stakedValue: '170000000000000000',
    neededValue: '250000000000000000',
    progressInPercents: 85,
    timeLeft: 15,
    expansionPanelDetails:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti alias aut ab placeat exercitationem minus illo repudiandae molestias delectus perferendis harum qui quis, quasi vero mollitia rem, temporibus odio excepturi?',
    status: 'PENDING',
  },
  {
    lendValue: '120000000000000000',
    address: '0x0000000000000000000000000000000000000000000000000000000000000000',
    aprValue: 15.8,
    stakedValue: '170000000000000000',
    neededValue: '250000000000000000',
    progressInPercents: 85,
    timeLeft: 15,
    expansionPanelDetails:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti alias aut ab placeat exercitationem minus illo repudiandae molestias delectus perferendis harum qui quis, quasi vero mollitia rem, temporibus odio excepturi?',
    status: 'APPROVED',
  },
  {
    lendValue: '120000000000000000',
    address: '0x0000000000000000000000000000000000000000000000000000000000000000',
    aprValue: 15.8,
    stakedValue: '170000000000000000',
    neededValue: '250000000000000000',
    progressInPercents: 85,
    timeLeft: 15,
    expansionPanelDetails:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti alias aut ab placeat exercitationem minus illo repudiandae molestias delectus perferendis harum qui quis, quasi vero mollitia rem, temporibus odio excepturi?',
    status: 'DECLINED',
  },
];

function LoanApplicationsList() {
  return (
    <Grid container spacing={3}>
      {activities.map((activity, index) => (
        <Grid key={index} item xs={12}>
          <LoanApplicationCard {...activity} />
        </Grid>
      ))}
    </Grid>
  );
}

export { LoanApplicationsList };
