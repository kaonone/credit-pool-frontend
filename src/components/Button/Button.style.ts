import { makeStyles } from 'utils/styles';

import type { OwnProps } from './Button';

const shadowOffset = 3;
const largeShadowOffset = 3;
const backgroundGradientSize = '300%';

const smallHeight = 2;
const smallHeightTabletXS = 3.5;

const height = 2.5;
const heightTabletXS = 4.5;

const largeHeight = 4.5;
const largeHeightTabletXS = 6;

export const useStyles = makeStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: 400,
    lineHeight: 1,

    padding: theme.spacing(0.5, 2),
    fontSize: theme.spacing(1.5),
    minWidth: theme.spacing(5.5),
    minHeight: theme.spacing(height),
    borderRadius: theme.spacing(height / 2),

    [theme.breakpoints.up('tabletXS')]: {
      padding: theme.spacing(1.25, 2.5),
      fontSize: theme.spacing(2),
      minWidth: theme.spacing(8.25),
      minHeight: theme.spacing(heightTabletXS),
      borderRadius: theme.spacing(heightTabletXS / 2),
    },
  },

  sizeSmall: {
    padding: theme.spacing(0.25, 1),
    fontSize: theme.spacing(1.25),
    minHeight: theme.spacing(smallHeight),
    borderRadius: theme.spacing(smallHeight / 2),
    [theme.breakpoints.up('tabletXS')]: {
      padding: theme.spacing(0.875, 2),
      fontSize: theme.spacing(2),
      minWidth: theme.spacing(13.25),
      minHeight: theme.spacing(smallHeightTabletXS),
      borderRadius: theme.spacing(smallHeightTabletXS / 2),
    },

    '&$outlinedPrimary': {
      minWidth: theme.spacing(12.25),
    },
  },

  sizeLarge: {
    minWidth: theme.spacing(10),
    minHeight: theme.spacing(largeHeight),
    borderRadius: theme.spacing(largeHeight / 2),
    [theme.breakpoints.up('tabletXS')]: {
      padding: theme.spacing(1.85, 4),
      fontSize: theme.spacing(2.5),
      minHeight: theme.spacing(largeHeightTabletXS),
      borderRadius: theme.spacing(largeHeightTabletXS / 2),
    },
  },

  outlinedPrimary: {
    borderWidth: 0,
    zIndex: 1,
    position: 'relative',
    backgroundImage: theme.gradients.outlinedButton.linear('to right'),
    backgroundSize: backgroundGradientSize,
    color: theme.palette.text.primary,
    transition: 'background-position 1s',

    '&$disabled': {
      background: `rgba(255, 255, 255, 0.2)`,
      color: `rgba(255, 255, 255, 0.5)`,
    },

    '&:before': {
      zIndex: -1,
      display: 'block',
      // tslint:disable-next-line: quotemark
      content: "''",
      position: 'absolute',
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
      backgroundColor: ({ backgroundColor }: OwnProps) =>
        backgroundColor || theme.palette.background.default,
      transition: theme.transitions.create(['opacity', 'background-color']),

      borderRadius: theme.spacing(height / 2) - 1,
      [theme.breakpoints.up('tabletXS')]: {
        borderRadius: theme.spacing(heightTabletXS / 2) - 1,
      },

      '$sizeSmall&': {
        borderRadius: theme.spacing(smallHeight / 2) - 1,
        [theme.breakpoints.up('tabletXS')]: {
          borderRadius: theme.spacing(smallHeightTabletXS / 2) - 1,
        },
      },

      '$sizeLarge&': {
        borderRadius: theme.spacing(largeHeight / 2) - 1,
        [theme.breakpoints.up('tabletXS')]: {
          borderRadius: theme.spacing(largeHeightTabletXS / 2) - 1,
        },
      },
    },

    '&:hover:not(:active), &$focusVisible': {
      border: 'none',
      color: theme.colors.royalBlue2,
    },

    '&:active': {
      border: 'none',
      backgroundPosition: '50%',
    },
  },

  containedPrimary: {
    boxShadow: 'none',
    color: theme.colors.white,
    marginBottom: 'auto',
    alignSelf: 'center',
    background: theme.gradients.button.linear('to right'),
    backgroundSize: backgroundGradientSize,
    opacity: 0.99,
    transition: 'background-position 1s',

    '&$disabled': {
      background: `rgba(255, 255, 255, 0.1)`,
      color: `rgba(255, 255, 255, 0.5)`,
    },

    '&:before': {
      // tslint:disable-next-line: quotemark
      content: "''",
      display: 'block',
      position: 'absolute',
      top: -shadowOffset,
      left: -shadowOffset,
      right: -shadowOffset,
      bottom: -shadowOffset,
      zIndex: '-1',
      background: theme.gradients.button.linear('to right'),
      backgroundSize: backgroundGradientSize,
      filter: 'blur(8px)',
      opacity: 0,
      transition: '1s',

      borderRadius: theme.spacing(height / 2 + 2 * shadowOffset),

      [theme.breakpoints.up('tabletXS')]: {
        borderRadius: theme.spacing(heightTabletXS / 2 + 2 * shadowOffset),
      },

      '&$sizeLarge': {
        filter: 'blur(8px)',
        top: -largeShadowOffset,
        left: -largeShadowOffset,
        right: -largeShadowOffset,
        bottom: -largeShadowOffset,
        borderRadius: theme.spacing(largeHeight / 2 + 2 * largeShadowOffset),
        [theme.breakpoints.up('tabletXS')]: {
          borderRadius: theme.spacing(largeHeightTabletXS / 2 + 2 * largeShadowOffset),
        },
      },
    },

    '&:hover:not(:active), &$focusVisible': {
      animation: '$animate 8s linear infinite',

      '&:before': {
        opacity: 0.7,
        animation: '$animate 8s linear infinite',
      },
    },

    '&:active': {
      boxShadow: 'none',
      backgroundPosition: '50%',
    },
  },

  disabled: {},
  focusVisible: {},

  '@keyframes animate': {
    '0%': {
      backgroundPosition: '0%',
    },
    '100%': {
      backgroundPosition: backgroundGradientSize,
    },
  },
}));
