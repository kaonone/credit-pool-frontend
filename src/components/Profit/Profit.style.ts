import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    '&$increase': {
      color: theme.colors.shamrock,
    },

    '&$decrease': {
      color: theme.colors.geraldine,
    },
  },

  icon: {
    position: 'relative',
    top: '.125em;',
    fontSize: 'inherit',

    '&$decrease': {
      transform: 'rotate(90deg)',
    },
  },

  increase: {},

  decrease: {},
}));
