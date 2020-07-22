import { makeStyles } from 'utils/styles';

const thumbSize = 10;
const borderOffset = 5;
const buttonSize = thumbSize + borderOffset * 2;

export const useStyles = makeStyles(
  theme => ({
    icon: {
      position: 'relative',
      borderRadius: '50%',
      width: buttonSize,
      height: buttonSize,
      padding: borderOffset,
      background: theme.gradients.main.linear('to right'),

      '&:before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        borderRadius: '50%',
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
        background: theme.palette.background.paper,
      },
    },

    iconChecked: {
      '&:after': {
        zIndex: 1,
        content: "''",
        display: 'block',
        position: 'relative',
        borderRadius: '50%',
        width: thumbSize,
        height: thumbSize,
        background: theme.gradients.main.linear('to right'),
      },
    },
  }),
  { name: 'RadioButton' },
);
