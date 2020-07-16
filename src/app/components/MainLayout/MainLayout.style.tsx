import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      height: '100%',
    },

    headerAndContent: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'auto',
      paddingLeft: 50,
      paddingRight: 30,
    },

    // TODO: remove duplication with extand plugin

    header: {
      marginTop: 30,
      backgroundColor: theme.palette.background.paperSecondary,
      borderRadius: 6,
      transition: theme.transitions.create('background-color'),
    },

    content: {
      flex: '1 100%',
      marginTop: 48,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 6,
      transition: theme.transitions.create('background-color'),
    },

    footer: {
      marginTop: 48,
      marginBottom: 56,
      backgroundColor: theme.palette.background.paperSecondary,
      borderRadius: 6,
      transition: theme.transitions.create('background-color'),
    },
  }),
  { name: 'MainLayout' },
);
