import { makeStyles, colors, Theme } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    ...theme.typography.h6,
    position: 'relative',
    top: '.125em;',
    display: 'inline-block',
    verticalAlign: 'center',
    height: '1em',
    width: '1em',
    color: colors.shamrock,
  },

  value: {
    display: 'inline-block',
    verticalAlign: 'center',
    color: colors.shamrock,
  },
}));
