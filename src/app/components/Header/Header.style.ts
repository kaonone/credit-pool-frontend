import { makeStyles, Theme, gradients } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(5)}px`,
    background: gradients.purple,
    borderRadius: 4,
  },

  backButton: {
    color: '#fff',
  },

  title: {
    color: '#fff',
    fontWeight: 600,
  },

  icon: {
    width: `${theme.spacing(2.5)}px`,
    height: `${theme.spacing(2.5)}px`,
    background: 'rgba(255, 255, 255, 0.2)',
  },

  dropdown: {
    width: `${theme.spacing(15.5)}px`,
    height: `${theme.spacing(4)}px`,
    background: 'rgba(255, 255, 255, 0.2)',
  },

  metric: {
    width: `${theme.spacing(15.5)}px`,
    height: `${theme.spacing(5.5)}px`,
    background: 'rgba(255, 255, 255, 0.2)',
  },

  button: {
    width: `${theme.spacing(15.5)}px`,
    height: `${theme.spacing(5.5)}px`,
    background: 'rgba(255, 255, 255, 0.2)',
  },
}));
