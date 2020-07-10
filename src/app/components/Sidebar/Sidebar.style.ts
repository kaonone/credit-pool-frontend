import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      padding: '100px 20px 20px 20px',
      background: theme.colors.coal,
      justifyContent: 'space-between',
      width: 180,
      transition: 'width 200ms',
    },

    upperPart: {},
    lowerPart: {
      display: 'flex',
      flexDirection: 'column',
    },
    upperLinks: {},

    rootShort: {
      width: '64px',
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
