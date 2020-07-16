import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'auto',
      flexDirection: 'column',
      padding: '100px 15px 20px',
      background: theme.palette.background.default,
      justifyContent: 'space-between',
      width: theme.spacing(26),
      transition: theme.transitions.create('width'),
    },

    upperPart: {
      width: '100%',
    },

    lowerPart: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(4),
    },

    upperLinks: {},

    rootShort: {
      width: theme.spacing(8),
      alignItems: 'center',

      '& $lowerPart': {
        marginLeft: 0,
      },
    },

    lowerLinks: {},

    switch: {
      border: 0,
      background: 'transparent',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
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
