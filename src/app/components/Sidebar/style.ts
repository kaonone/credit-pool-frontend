import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px 30px 20px 30px',
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

    '&:hover $inactiveLinkIcon path': {
      opacity: 1,
    },

    '&:hover $linkLabel': {
      opacity: 0.75,
    }
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
    cursor: 'pointer',
    alignSelf: 'flex-end',

    '& path': {
      opacity: 0.5,
    },

    '&:hover path': {
      opacity: 1,
    },
  },
}), { name: 'sidebar' });
