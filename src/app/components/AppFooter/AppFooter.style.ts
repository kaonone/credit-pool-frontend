import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: 49,
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
  },

  copyright: {
    display: 'flex',
  },

  text: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#ffffff',
    opacity: 0.3,
    marginRight: 10,
    borderStyle: 'none',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',

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
