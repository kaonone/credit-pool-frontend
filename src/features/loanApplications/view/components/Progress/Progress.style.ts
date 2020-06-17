import { makeStyles, colors } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  timeLeftTitle: {
    color: theme.palette.text.primary,
  },

  timeLeftValue: {
    fontWeight: 500,
    color: colors.geraldine,
  },
}));
