import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    background: theme.colors.codGray,
    display: 'flex',
  },

  sidebar: {
    position: 'sticky',
    top: 0,
    height: '100vh'
  },

  headerAndContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 50,
    paddingRight: 30,
  },

  header: {
    paddingTop: 30,
  },

  content: {
    flex: 1,
  },
}), { name: 'main-layout' });
