import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  {
    icon: {
      fontSize: 20,
      color: '#0a0a0e',
    },
    pending: {
      backgroundColor: '#594cf2',
    },
    success: {
      backgroundColor: '#6bfe97',
    },
    error: {
      backgroundColor: '#fe5a59',
    },
  },
  { name: 'Snackbar' },
);
