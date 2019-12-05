import { makeStyles, Theme, colors } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: theme.spacing(18),

    '&$dark': {
      '& $metricTitle': {
        color: 'rgba(255, 255, 255, 0.8)',
      },
      '& $metricValue': {
        color: '#fff',
      },
    },

    '&$light': {
      '& $metricTitle': {
        color: colors.topaz,
      },
      '& $metricValue': {
        color: colors.haiti,
        fontWeight: 400,
      },
    },
  },

  dark: {},

  light: {},

  metricTitle: {
    lineHeight: `${theme.spacing(3.5)}px`,
    textTransform: 'uppercase',
  },

  metricValue: {
    lineHeight: `${theme.spacing(4)}px`,
    fontWeight: 600,
  },
}));
