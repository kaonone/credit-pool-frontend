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
      display: 'flex',
      marginLeft: 150,
    },

    comingSoonLabel: {
      marginLeft: -20,
      marginTop: 14,
    }
  }),
  { name: 'Metrics' },
);
