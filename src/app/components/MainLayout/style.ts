import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    background: theme.colors.codGray,
    display: 'flex',
    minHeight: '100vh',
  },

  headerAndContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '50px',
    paddingRight: '30px',
  },

  header: {
    paddingTop: '30px',
  },

  content: {
    flex: 1,
  },
}), { name: 'main-layout' });
