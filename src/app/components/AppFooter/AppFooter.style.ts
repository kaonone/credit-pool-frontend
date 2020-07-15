import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: 49,
    paddingLeft: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  copyright: {
    display: 'flex',
  },

  text: {
    fontSize: 10,
    lineHeight: 1.6,
    opacity: 0.3,
    marginRight: 10,

    [theme.breakpoints.up('tabletXS')]: {
      fontSize: 12,
      marginRight: 50,
    },

    [theme.breakpoints.up('desktopMD')]: {
      lineHeight: 1.83,
    },
  },
}));

export { useStyles };
