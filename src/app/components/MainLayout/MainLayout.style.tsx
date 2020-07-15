import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      height: '100%',
    },

    headerAndContent: {
      display: 'flex',
      background: theme.colors.obsidian,
      flex: 1,
      flexDirection: 'column',
      overflow: 'auto',
      paddingLeft: 50,
      paddingRight: 30,
    },

    header: {
      marginTop: 30,
    },

    content: {
      marginTop: 48,
    },

    footer: {
      marginTop: 48,
    },

    paperBackground: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 6,
      transition: theme.transitions.create('background-color'),
    },
  }),
  { name: 'main-layout' },
);
