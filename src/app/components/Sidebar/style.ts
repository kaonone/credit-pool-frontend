import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px 20px 20px 20px',
    background: theme.colors.charade,
    justifyContent: 'space-between',
    width: '180px',
    transition: 'width 200ms',
  },

  rootShort: {
    width: '64px',
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
    padding: '5px',
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
