import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'inline-flex',
    },

    activateButton: {
      marginLeft: 20,
    },
  }),
  { name: 'PendingLoansButtons' },
);
