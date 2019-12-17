import * as React from 'react';
import BN from 'bn.js';

import { Grid, PersonalInformation, Chart, IChartPoint } from 'components';

const chartPoints: IChartPoint[] = [
  {
    date: Date.UTC(2019, 1, 13, 9, 15, 15, 15),
    value: 5,
  },
  {
    date: Date.UTC(2019, 3, 13, 9, 15, 15, 15),
    value: 70,
  },
  {
    date: Date.UTC(2019, 5, 13, 9, 15, 15, 15),
    value: 50,
  },
  {
    date: Date.UTC(2019, 7, 13, 9, 15, 15, 15),
    value: 1,
  },
  {
    date: Date.UTC(2019, 10, 13, 9, 15, 15, 15),
    value: 100,
  },
  {
    date: Date.UTC(2019, 11, 13, 9, 15, 15, 15),
    value: 30,
  },
  {
    date: Date.UTC(2019, 11, 16, 9, 15, 15, 15),
    value: 10,
  },
  {
    date: Date.UTC(2019, 11, 16, 10, 15, 15, 15),
    value: 3100,
  },
  {
    date: Date.UTC(2019, 11, 16, 11, 15, 15, 15),
    value: 150,
  },
];

export function OverviewPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Chart
          chartPoints={chartPoints}
          title="Pool Balance"
          balance={new BN(1155000000000000)}
          balanceDayAgo={new BN(1000000000000000)}
          members={[
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            '0x0000000000000000000000000000000000000000000000000000000000000002',
            '0x0000000000000000000000000000000000000000000000000000000000000003',
          ]}
        />
      </Grid>
      <Grid item xs={4}>
        <Chart
          chartPoints={chartPoints}
          title="PTK Price"
          balance={new BN(1155000000000000)}
          balanceDayAgo={new BN(1000000000000000)}
          members={[
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            '0x0000000000000000000000000000000000000000000000000000000000000002',
            '0x0000000000000000000000000000000000000000000000000000000000000003',
          ]}
        />
      </Grid>
      <Grid item xs={4}>
        <PersonalInformation />
      </Grid>
    </Grid>
  );
}
