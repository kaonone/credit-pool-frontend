import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'auto',
      flexDirection: 'column',
      padding: '100px 15px 65px',
      background: theme.colors.darkBlueMagenta,
      justifyContent: 'space-between',
      width: 208,
      transition: 'width 200ms',
    },

    upperPart: {},

    lowerPart: {
      alignSelf: 'flex-end',
    },

    upperLinks: {},

    rootShort: {
      width: 54,

      '& $lowerPart': {
        alignSelf: 'center',
      },
    },

    lowerLinks: {},

    switch: {
      opacity: 0.5,

      '&:hover': {
        opacity: 1,
      },
    },

    switchInverted: {
      transform: 'rotate(180deg)',
    },
  }),
  { name: 'Sidebar' },
);
