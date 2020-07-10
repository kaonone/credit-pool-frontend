import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      background: theme.colors.codGray,
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 30,
    },

    leftPart: {
      display: 'flex',
    },

    logo: {
      display: 'flex',

      fontSize: theme.spacing(2.5),
      [theme.breakpoints.up('tabletXS')]: {
        fontSize: theme.spacing(5),
      },
    },

    authButton: {
      marginRight: 50,
    },

    rightPart: {
      display: 'flex',
    },

    links: {
      display: 'flex',
      marginLeft: 10,
      alignItems: 'center',
    },
  }),
  { name: 'header' },
);
