import { createMuiTheme, Theme } from '@material-ui/core/styles';

import { colors } from 'utils/styles/colors';

import {
  robotoThin,
  robotoThinItalic,
  robotoLight,
  robotoLightItalic,
  robotoRegular,
  robotoItalic,
  robotoMedium,
  robotoMediumItalic,
  robotoBold,
  robotoBoldItalic,
  robotoBlack,
  robotoBlackItalic,
} from './fonts';
import { makeGradient } from './makeGradient';
import { generateGridSpacingOverrides } from './generateGridSpacingOverrides';

export { Theme };

const defaultTheme = createMuiTheme();

function getGradients(type: 'dark' | 'light') {
  return {
    main: makeGradient([colors.heliotrope, colors.royalBlue]),
    products: [
      makeGradient(
        type === 'dark' ? [colors.jacarta, colors.blueZodiac] : [colors.zumthor2, colors.linkWater],
      ),
      makeGradient(
        type === 'dark' ? [colors.jacarta2, colors.bunting] : [colors.whisper, colors.blueChalk],
      ),
      makeGradient(
        type === 'dark' ? [colors.bossanova, colors.valhalla] : [colors.snuff, colors.amour],
      ),
    ] as const,
    button: makeGradient([
      colors.heliotrope,
      colors.royalBlue,
      colors.heliotrope2,
      colors.heliotrope,
    ]),
  };
}

const lightPalette = {
  primary: {
    main: colors.purpleHeart,
    light: colors.heliotrope,
    dark: colors.mediumPurple,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.electricViolet,
    light: colors.electricViolet,
    dark: colors.electricViolet,
    contrastText: colors.electricViolet,
  },
  text: {
    primary: colors.black,
  },
  error: {
    main: colors.monza,
  },
  background: {
    default: colors.white,
  },
  type: 'light' as const,
};

export const darkPalette = {
  primary: {
    main: colors.purpleHeart,
    light: colors.heliotrope,
    dark: colors.mediumPurple,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.electricViolet,
    light: colors.electricViolet,
    dark: colors.electricViolet,
    contrastText: colors.electricViolet,
  },
  text: {
    primary: colors.white,
  },
  error: {
    main: colors.monza,
  },
  background: {
    default: colors.charade,
  },
  type: 'dark' as const,
};

const unit = 8;

const baseThemeStyles = {
  palette: lightPalette,
  colors,
  gradients: getGradients('light'),
  sizes: {
    control: {
      borderRadius: 4,
    },
    maxContentWidth: 1400,
    maxSubtitleWidth: 1000,
  },
  spacing: {
    unit,
    layoutContentSkew: {
      xsHeight: unit * 3,
      lgHeight: unit * 4,
    },
    headerHeight: {
      xs: 80,
      md: 96,
      lg: 112,
    },
    horizontalPagePaddings: {
      xs: {
        small: unit,
        medium: unit * 2,
        large: unit * 3,
      },
      md: {
        small: unit * 1.5,
        medium: unit * 4,
        large: unit * 10.5,
      },
      lg: {
        small: unit * 1.5,
        medium: unit * 8.5,
        large: unit * 12,
      },
    },
  },
  typography: {
    primaryFont: ['Helvetica Neue', 'Arial', 'sans-serif'].join(','),
    secondaryFont: ['Helvetica Neue', 'Arial', 'sans-serif'].join(','), // TODO remove
  },
  zIndex: {
    tooltip: 1500,
  },
  defaultTransitionDuration: '0.4s',
};

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

function getTheme(type: 'light' | 'dark'): Theme {
  return createMuiTheme({
    extra: baseThemeStyles,
    colors,
    gradients: getGradients(type),
    palette: type === 'light' ? lightPalette : darkPalette,
    breakpoints: {
      keys: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'desktopXL',
        'desktopLG',
        'desktopMD',
        'desktopSM',
        'desktopXS',
        'tabletSM',
        'tabletXS',
        'mobileSM',
        'mobileXS',
      ],
      values: {
        xs: 0,
        sm: 375,
        md: 767,
        lg: 1023,
        xl: 1919,
        desktopXL: 2560,
        desktopLG: 1920,
        desktopMD: 1440,
        desktopSM: 1360,
        desktopXS: 1280,
        tabletSM: 1024,
        tabletXS: 768,
        mobileSM: 414,
        mobileXS: 0,
      },
    },
    typography: {
      fontFamily: baseThemeStyles.typography.primaryFont,
    },
    shape: {
      borderRadius: baseThemeStyles.sizes.control.borderRadius,
    },
    overrides: {
      MuiDrawer: {
        paper: {
          display: 'block',
          width: defaultTheme.spacing(60),
          padding: defaultTheme.spacing(4, 5),
          backgroundColor: type === 'dark' ? colors.blackCurrant : colors.white,
        },
      },
      MuiPaper: {
        root: {
          transition: defaultTheme.transitions.create(['background-color', 'box-shadow']),
        },
      },
      MuiLink: {
        underlineHover: {
          borderWidth: '0 0 1px 0',
          borderStyle: 'solid',
          borderColor: type === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',

          '&:hover': {
            textDecoration: 'none',
            borderColor: 'inherit',
          },
        },
      },
      MuiCssBaseline: {
        '@global': {
          '@font-face': [
            robotoThin,
            robotoThinItalic,
            robotoLight,
            robotoLightItalic,
            robotoRegular,
            robotoItalic,
            robotoMedium,
            robotoMediumItalic,
            robotoBold,
            robotoBoldItalic,
            robotoBlack,
            robotoBlackItalic,
          ],
          html: {
            boxSizing: 'border-box',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontSize: 16,
            fontFamily: 'Roboto, sans-serif',
          },

          body: {
            margin: 0,
            fontSize: '1rem',
            transition: defaultTheme.transitions.create('background-color'),
          },

          'html, body, #root': {
            height: '100%',
          },

          '#root': {
            zIndex: 1,
            position: 'relative',
          },

          '*, *::before, *::after': {
            boxSizing: 'inherit',
          },

          '@media print': {
            body: {
              backgroundColor: '#fff',
            },
          },

          '#walletconnect-wrapper': {
            zIndex: defaultTheme.zIndex.modal,
            position: 'relative',
          },
        },
      },

      MuiButton: {
        endIcon: {
          '&:empty': {
            display: 'none',
          },
        },

        startIcon: {
          '&:empty': {
            display: 'none',
          },
        },
      },

      MuiExpansionPanelSummary: {
        root: {
          '&$expanded': {
            minHeight: defaultTheme.spacing(6),
          },
        },

        content: {
          '&$expanded': {
            margin: defaultTheme.spacing(1.5, 0),
          },
        },
      },

      MuiGrid: {
        ...generateGridSpacingOverrides(defaultTheme.spacing),
      },
      MuiSnackbarContent: {
        root: {
          backgroundColor: '#fff',
        },
        message: {
          color: colors.rhino,
        },
      },
      MuiFormControlLabel: {
        root: {
          marginRight: 0,
        },
      },
    },
  });
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    extra: typeof baseThemeStyles;
    colors: typeof colors;
    gradients: ReturnType<typeof getGradients>;
  }

  interface ThemeOptions {
    extra: typeof baseThemeStyles;
    colors: typeof colors;
    gradients: ReturnType<typeof getGradients>;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    hint: string;
    tableHeader: string;
  }
}

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    desktopXL: true;
    desktopLG: true;
    desktopMD: true;
    desktopSM: true;
    desktopXS: true;
    tabletSM: true;
    tabletXS: true;
    mobileSM: true;
    mobileXS: true;
  }
}
