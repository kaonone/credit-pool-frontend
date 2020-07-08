import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px 50px 20px 50px',
    background: theme.colors.charade,
    justifyContent: 'space-between',
  },

  separator: {
    margin: '40px 0',
    width: '100px',
    height: '1px',
    background: theme.colors.white,
    opacity: '0.2',
  },

  links: {
    minWidth: '128px',
  },

  lowerLinks: {
    marginTop: '300px',
  },

  link: {
    marginTop: '30px',
    display: 'flex',
    color: theme.colors.white,
    textDecoration: 'none',
    fontSize: '16px',
  },

  linkIcon: {
    marginRight: '12px',
  },

  activeLinkIcon: {
    display: 'none',
  },

  inactiveLinkIcon: {},

  linkLabel: {
    opacity: 0.5,
  },

  linkActive: {
    '& $linkLabel': {
      opacity: 1,
    },

    '& $activeLinkIcon': {
      display: 'block',
    },

    '& $inactiveLinkIcon': {
      display: 'none',
    },
  },

  switch: {
    marginBottom: '20px',
  },
}), { name: 'sidebar' });
