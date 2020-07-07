import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    background: theme.colors.codGray,
    display: 'flex',
    minHeight: '100vh',
  },

  headerAndContent: {
    paddingLeft: '50px',
    paddingRight: '30px',
  },

  header: {
    paddingTop: '30px',
  },

  content: {},
}), { name: 'main-layout' });
