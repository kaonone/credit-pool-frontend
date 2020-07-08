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

  lowerLinks: {
    marginTop: '300px',
  },

  link: {
    marginTop: '30px',
    display: 'flex',
    color: theme.colors.white,
    opacity: 0.5,
    textDecoration: 'none',
    fontSize: '16px',
  },

  linkLabel: {
    marginLeft: '12px',
  },

  linkActive: {
    opacity: 1,

    '& path': {
      fill: 'url(#grad) #fff',
    }
  }
}), { name: 'sidebar' });
