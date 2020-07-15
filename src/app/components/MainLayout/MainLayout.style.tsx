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
      paddingTop: 30,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 6,
    },

    content: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 6,
    },

    footer: {
      marginTop: 48,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 6,
    },
  }),
  { name: 'main-layout' },
);
