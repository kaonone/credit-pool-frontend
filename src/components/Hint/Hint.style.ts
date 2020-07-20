import { Theme, makeStyles, lighten } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.25rem',
      textAlign: 'center',
      transition: theme.transitions.create('background-color'),

      '&$isSmall': {
        padding: theme.spacing(0.5, 1.5),
        minHeight: theme.spacing(4),
      },

      '&$isMedium': {
        padding: theme.spacing(1.5, 3),
        minHeight: theme.spacing(6),
      },

      '&$colorDefault': {
        backgroundColor: theme.palette.background.hint,
      },

      '&$colorError': {
        color: theme.palette.error.main,
        backgroundColor: lighten(theme.palette.error.main, 0.8),
      },

      '&$withOverlay': {
        position: 'absolute',
        borderRadius: 6,
        top: -8,
        bottom: -8,
        left: -8,
        right: -8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        overflow: 'hidden',
        color: theme.palette.text.secondary,
        background: 'transparent',

        '&:before': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: theme.palette.background.hint,
          opacity: 0.5,
          zIndex: -1,
        },
      },
    },

    isSmall: {},
    isMedium: {},

    colorDefault: {},
    colorError: {},

    withOverlay: {},
  };
});
