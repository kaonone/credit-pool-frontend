import { makeStyles, Theme } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    paddingRight: theme.spacing(2),
    fontWeight: 500,
  },

  details: {
    display: 'block',
    padding: 0,
  },
}));
