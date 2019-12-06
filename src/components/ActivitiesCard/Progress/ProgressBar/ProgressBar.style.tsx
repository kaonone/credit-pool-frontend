import { makeStyles, Theme, colors } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},

  title: {
    color: colors.haiti,
  },

  percentValue: {
    fontWeight: 500,
    color: colors.shamrock,
  },

  progressBar: {
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(1),
    overflow: 'hidden',
    backgroundColor: colors.athensGray,
  },

  progressBarValue: {
    height: '100%',
    backgroundColor: colors.shamrock,
  },
}));
