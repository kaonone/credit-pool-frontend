import { makeStyles, colors, Theme } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    ...theme.typography.h6,
    display: 'block',
    color: colors.shamrock,
  },

  value: {
    color: colors.shamrock,
  },
}));
