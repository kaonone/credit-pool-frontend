import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  () => {
    return {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
      },

      label: {},
      value: {},
    };
  },
  { name: 'Summary' },
);
