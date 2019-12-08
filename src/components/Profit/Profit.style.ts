import { makeStyles, colors, Theme } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    ...theme.typography.h6,
    position: 'relative',
    top: '.125em;',
    color: colors.shamrock,
  },

  value: {
    color: colors.shamrock,
  },
}));
