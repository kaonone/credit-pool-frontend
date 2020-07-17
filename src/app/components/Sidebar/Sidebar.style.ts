import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'auto',
      flexDirection: 'column',
      padding: '100px 15px 20px',
      background: theme.palette.background.paperSecondary,
      justifyContent: 'space-between',
      width: theme.spacing(26),
      transition: theme.transitions.create('width'),
    },

    upperPart: {
      width: '100%',
      paddingLeft: 5,
    },

    lowerPart: {
      display: 'flex',
      flexDirection: 'column',
    },

    upperLinks: {},

    rootShort: {
      width: theme.spacing(8),
    },

    lowerLinks: {},

    switch: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      padding: 5,
      alignSelf: 'flex-end',

      '& path': {
        opacity: 0.5,
      },

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
