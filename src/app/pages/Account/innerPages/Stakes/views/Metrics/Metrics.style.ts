import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    column: {},

    columnElement: {
      marginTop: 50,
      position: 'relative',
      padding: 10,

      '&:first-child': {
        marginTop: 0,
      },
    },

    comingSoonMetric: {
      opacity: 0.3,
    },
  }),
  { name: 'Metrics' },
);
