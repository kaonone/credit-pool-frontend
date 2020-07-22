import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  () => ({
    root: {},

    currentLoansTable: {
      marginTop: 75,
    },

    pendingLoansTable: {
      marginTop: 75,
    },

    tableTitle: {
      marginBottom: 20,
    },
  }),
  { name: 'Borrows' },
);
