import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px 20px 20px 20px',
    background: theme.colors.charade,
    justifyContent: 'space-between',
  },

  links: {
    minWidth: '128px',
  },

  linksShort: {
    minWidth: '24px',
  },

  lowerLinks: {
    marginTop: '300px',
  },

  link: {
    marginTop: '30px',
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
    marginTop: '16px',
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

  switchInverted: {
    transform: 'rotate(180deg)',
  }
}), { name: 'sidebar' });
