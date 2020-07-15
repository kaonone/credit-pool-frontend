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
    },

    content: {
      flex: 1,
    },
  }),
  { name: 'MainLayout' },
);
