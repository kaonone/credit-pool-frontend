import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    background: 'black',
    padding: '100px 50px',
  },

  separator: {
    margin: '40px 0',
    height: '1px',
    background: theme.colors.white,
    opacity: '0.2',
  },

  link: {
    display: 'block',
    color: theme.colors.white,
    opacity: 0.5,
    marginTop: '30px',
    textDecoration: 'none',
  },

  linkActive: {
    opacity: 1,
  }
}));
