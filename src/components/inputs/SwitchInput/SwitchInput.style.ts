import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      width: 34,
      height: 20,
      padding: 0,
      marginRight: 10,
    },
    switchBase: {
      padding: 3,
      '&$checked': {
        transform: 'translateX(14px)',
      },
    },
    thumb: {
      width: 14,
      height: 14,
      background: theme.gradients.main.linear('to right'),
    },
    track: {
      borderRadius: 24,
      border: 'none',
      position: 'relative',
      opacity: 0.5,
      background: theme.gradients.main.linear('to right'),

      '&:before': {
        zIndex: -1,
        display: 'block',
        content: "''",
        position: 'absolute',
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
        borderRadius: 24,
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create(['opacity', 'background-color']),
      },

      '$switchBase$checked &': {
        opacity: 1,
      },
    },
    checked: {},
  }),
  { name: 'SwitchInput' },
);
