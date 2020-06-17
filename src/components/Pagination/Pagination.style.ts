import { Theme, makeStyles } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1.25, 2.5),
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

  disabled: {},

  itemsPerPage: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(),
  },

  currentItems: {
    color: theme.palette.text.secondary,
  },

  select: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  },
}));
