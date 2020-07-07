import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    background: theme.colors.charade,
    padding: '100px 50px',
  },

  separator: {
    margin: '40px 0',
    width: '100px',
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
    fontSize: '16px',
  },

  linkActive: {
    opacity: 1,
  }
}), { name: 'sidebar' });
