import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    background: theme.colors.codGray,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },

  leftPart: {
    display: 'flex',
  },

  authButton: {
    marginLeft: '40px',
  },

  rightPart: {
    display: 'flex',
  },
}), { name: 'header' });
