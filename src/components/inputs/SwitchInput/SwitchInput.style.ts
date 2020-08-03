import { makeStyles } from 'utils/styles';

const thumbSize = 14;
const borderOffset = 3;
const controlWidth = 34;
const controlPadding = 9;
const borderRadius = 24;

export const useStyles = makeStyles(
  theme => ({
    root: {
      width: controlWidth + 2 * controlPadding,
      height: thumbSize + 2 * (borderOffset + controlPadding),
      padding: 9,
    },

    switchBase: {
      top: borderOffset,
      bottom: borderOffset,
      left: borderOffset,
      '&$checked': {
        transform: 'translateX(14px)',

        '& + $track, & + $track:after, & $thumb:after': {
          opacity: 1,
        },
      },
    },

    thumb: {
      position: 'relative',
      width: thumbSize,
      height: thumbSize,
      background: theme.colors.independence,
      boxShadow: 'none',

      '&:after': {
        display: 'block',
        content: "''",
        position: 'absolute',
        borderRadius: '50%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        background: theme.gradients.main.linear('to right'),
        transition: theme.transitions.create(['opacity']),
      },
    },

    track: {
      borderRadius,
      border: 'none',
      position: 'relative',
      opacity: 1,
      background: theme.colors.independence,

      '&:before': {
        zIndex: -1,
        display: 'block',
        content: "''",
        position: 'absolute',
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
        borderRadius,
        background: theme.palette.background.paper,
      },

      '&:after': {
        zIndex: -2,
        display: 'block',
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        borderRadius,
        background: theme.gradients.main.linear('to right'),
        transition: theme.transitions.create(['opacity']),
      },
    },

    checked: {},
  }),
  { name: 'SwitchInput' },
);
