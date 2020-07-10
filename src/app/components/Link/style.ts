import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    color: theme.colors.white,
    textDecoration: 'none',
    fontSize: 16,
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    '&:hover $inactiveIcon path': {
      opacity: 1,
    },

    '&:hover $label': {
      opacity: 0.75,
    },
  },

  icon: {},

  activeIcon: {
    display: 'none',
  },

  inactiveIcon: {},

  label: {
    opacity: 0.5,

    '$icon + &': {
      marginLeft: 12,
    },
  },

  active: {
    '& $label': {
      opacity: 1,
    },

    '& $activeIcon': {
      display: 'block',
    },

    '& $inactiveIcon': {
      display: 'none',
    },
  },
}), { name: 'link' });
