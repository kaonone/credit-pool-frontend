import { makeStyles, Theme } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: theme.spacing(18),
  },

  metricTitle: {
    lineHeight: `${theme.spacing(3.5)}px`,
    textTransform: 'uppercase',
    opacity: 0.8,
  },

  metricValue: {
    lineHeight: `${theme.spacing(4)}px`,
    fontWeight: 600,
  },
}));
