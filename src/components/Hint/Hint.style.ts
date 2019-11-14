import { Theme, colors, makeStyles } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1.5, 3),
      borderRadius: '0.25rem',
      backgroundColor: colors.whiteLilac,
      textAlign: 'center',

      '&$isSmall': {
        minHeight: theme.spacing(3),
      },

      '&$isMedium': {
        minHeight: theme.spacing(6),
      },
    },

    isSmall: {},
    isMedium: {},
  };
});
