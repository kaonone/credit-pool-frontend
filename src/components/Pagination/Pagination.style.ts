import { Theme, makeStyles } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 55,
    borderRadius: '0.25rem',
    backgroundColor: theme.palette.background.tableHeader,
    transition: theme.transitions.create('background-color'),
  },

  toggleIcon: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,

    '&$disabled': {
      color: theme.palette.text.disabled,
    },
  },

  toggleButton: {
    margin: -theme.spacing(1),
  },

  buttonLoading: {
    display: 'block',
  },

  toggleBack: {
    transform: 'rotate(180deg)',
  },

  disabled: {
    opacity: 0.3,
  },

  currentItems: {
    color: theme.palette.text.secondary,
  },

  total: {
    color: theme.colors.stateBlue,
  },
}));
