import { makeStyles } from 'utils/styles';

import * as YieldChart from './images/chart-yield.svg';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxWidth: 480,
      marginLeft: 'auto',
    },

    header: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },

    chart: {
      flex: 1,
      background: `url('${YieldChart}') no-repeat center / contain`,
    },
  }),
  { name: 'YieldSummary' },
);
