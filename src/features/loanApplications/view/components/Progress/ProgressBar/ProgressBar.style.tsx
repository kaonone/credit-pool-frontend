import { makeStyles, Theme, colors } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},

  title: {
    color: theme.palette.text.primary,
  },

  percentValue: {
    fontWeight: 500,
    color: colors.shamrock,
  },

  progressRoot: {
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(1),
    backgroundColor: colors.athensGray,
  },

  progressBar: {
    backgroundColor: colors.shamrock,
  },
}));
