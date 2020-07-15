import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'auto',
      flexDirection: 'column',
      padding: '100px 15px 20px',
      background: theme.palette.background.paper,
      justifyContent: 'space-between',
      width: 208,
      transition: 'width 200ms',
    },

    upperPart: {},

    lowerPart: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 32,
    },

    upperLinks: {},

    rootShort: {
      width: 64,
      alignItems: 'center',

      '& $lowerPart': {
        marginLeft: 0,
      },
    },

    lowerLinks: {},

    switch: {
      border: 0,
      background: 'transparent',
      marginTop: 16,
      marginBottom: 20,
      padding: 5,
      cursor: 'pointer',
      alignSelf: 'flex-end',

      '& path': {
        opacity: 0.5,
      },

      '&:hover path': {
        opacity: 1,
      },
    },

    switchInverted: {
      transform: 'rotate(180deg)',
    },
  }),
  { name: 'sidebar' },
);
