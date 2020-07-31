import { makeStyles } from 'utils/styles';

import * as YieldChart from './images/chart-yield.svg';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxWidth: 430,
      marginLeft: 'auto',
    },

    header: {
      marginBottom: 27,
    },

    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      height: '100%',
    },

    chart: {
      flex: 1,
      alignSelf: 'stretch',
      marginTop: 21,
      background: `url('${YieldChart}') no-repeat center / contain`,
    },
  }),
  { name: 'YieldSummary' },
);
