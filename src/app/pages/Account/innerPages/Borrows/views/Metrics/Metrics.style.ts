import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
    },

    yourMaxAvalaibleCreditMetric: {
      marginTop: 50,
    },

    totalLoans: {
      marginLeft: 150,
    },
  }),
  { name: 'Metrics' },
);
