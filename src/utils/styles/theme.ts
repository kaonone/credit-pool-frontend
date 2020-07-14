import { createMuiTheme, Theme } from '@material-ui/core/styles';

import { colors } from 'utils/styles/colors';

import {
  helveticaNeueBold,
  helveticaNeueBoldItalic,
  helveticaNeueCondensedBlack,
  helveticaNeueCondensedBold,
  helveticaNeueItalic,
  helveticaNeueLight,
  helveticaNeueLightItalic,
  helveticaNeueMedium,
  helveticaNeueMediumItalic,
  helveticaNeueThin,
  helveticaNeueThinItalic,
  helveticaNeueUltraLight,
  helveticaNeueUltraLightItalic,
  helveticaNeue,
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
    creditPoolIcon: makeGradient(
      type === 'dark'
        ? [colors.northWesternPurple, colors.darkPurple]
        : [colors.lilac, colors.iris],
    ),
    creditPoolText: makeGradient([colors.blueViolet, colors.lavenderBlue]),
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

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

function getTheme(type: 'light' | 'dark'): Theme {
  const tabsHeight = 36;
  const tabsIndicatorSpace = 3;
  const tabsBorderWidth = 1;

  return createMuiTheme({
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
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
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
      fontFamily: ['Helvetica Neue', 'Arial', 'sans-serif'].join(','),
    },
    shape: {
      borderRadius: 4,
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
            helveticaNeueBold,
            helveticaNeueBoldItalic,
            helveticaNeueCondensedBlack,
            helveticaNeueCondensedBold,
            helveticaNeueItalic,
            helveticaNeueLight,
            helveticaNeueLightItalic,
            helveticaNeueMedium,
            helveticaNeueMediumItalic,
            helveticaNeueThin,
            helveticaNeueThinItalic,
            helveticaNeueUltraLight,
            helveticaNeueUltraLightItalic,
            helveticaNeue,
          ],
          html: {
            boxSizing: 'border-box',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontSize: 16,
            fontFamily: 'helvetica, sans-serif',
          },

          body: {
            margin: 0,
            fontSize: '1rem',
            transition: defaultTheme.transitions.create('background-color'),
            overflow: 'hidden',
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

      MuiTabs: {
        root: {
          display: 'inline-flex',
          overflow: 'hidden',
          minHeight: tabsHeight,
          borderRadius: tabsHeight / 2,
          padding: tabsIndicatorSpace,
          border: `${tabsBorderWidth}px solid ${colors.heliotrope}`,
        },

        indicator: {
          top: 0,
          height: tabsHeight - tabsIndicatorSpace * 2 - tabsBorderWidth * 2,
          borderRadius: tabsHeight / 2 - tabsIndicatorSpace - tabsBorderWidth,
          zIndex: -1,
          background: 'linear-gradient(to left, #544cf2, #d93cef)',
        },

        scroller: {
          overflow: 'hidden',
          borderRadius: tabsHeight / 2 - tabsIndicatorSpace - tabsBorderWidth,
        },
      },

      MuiTab: {
        root: {
          minHeight: 'unset',
          padding: defaultTheme.spacing(0.2, 1.5),
          textTransform: 'unset',

          '&$selected': {
            color: colors.white,
          },
        },
      },

      MuiSvgIcon: {
        root: {
          display: 'block',
        },
      },
    },
  });
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: typeof colors;
    gradients: ReturnType<typeof getGradients>;
  }

  interface ThemeOptions {
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
