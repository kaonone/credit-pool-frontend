import { makeStyles } from 'utils/styles';

import * as YieldChart from './images/chart-yield.svg';

export const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
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
