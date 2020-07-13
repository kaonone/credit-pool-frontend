import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      background: theme.colors.darkBlueMagenta,
      padding: '16px 50px',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 30,
    },

    leftPart: {
      display: 'flex',
    },

    logo: {
      display: 'flex',
    },

    authButton: {
      marginRight: 50,
      display: 'flex',
    },

    rightPart: {
      display: 'flex',
      alignItems: 'center',
    },

    links: {
      display: 'flex',
      marginLeft: 10,
      alignItems: 'center',
    },
  }),
  { name: 'header' },
);
