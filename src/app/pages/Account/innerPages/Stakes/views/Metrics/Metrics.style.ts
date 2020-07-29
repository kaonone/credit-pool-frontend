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

      '&:first-child': {
        marginTop: 0,
      },
    },
  }),
  { name: 'Metrics' },
);
