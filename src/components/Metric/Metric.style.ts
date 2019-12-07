import { makeStyles, Theme, colors } from 'utils/styles';

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
    display: 'inline-block',
    verticalAlign: 'baseline',
    lineHeight: `${theme.spacing(4)}px`,
    fontWeight: 500,
  },

  metricSubValue: {
    display: 'inline-block',
    verticalAlign: 'baseline',
    marginLeft: theme.spacing(1),
    color: colors.frenchGray,
  },
}));
