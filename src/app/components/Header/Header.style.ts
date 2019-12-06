import { makeStyles, Theme, gradients } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 5),
    background: gradients.purple,
    borderRadius: 4,
    color: '#fff',
  },

  backButton: {
    color: '#fff',
  },

  title: {
    fontWeight: 600,
  },

  icon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    background: 'rgba(255, 255, 255, 0.2)',
  },

  dropdown: {
    width: theme.spacing(15.5),
    height: theme.spacing(4),
    background: 'rgba(255, 255, 255, 0.2)',
  },

  button: {
    width: theme.spacing(15.5),
    height: theme.spacing(5.5),
    background: 'rgba(255, 255, 255, 0.2)',
  },
}));
