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
    marginRight: '50px',
  },

  rightPart: {
    display: 'flex',
  },

  links: {
    display: 'flex',
    marginLeft: '10px',
    alignItems: 'center',
  },
}), { name: 'header' });
