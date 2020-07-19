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
    poolBalanceChart: [
      makeGradient(['#fc87e2', '#f24cb6']),
      makeGradient(['#63afdd', '#574cf2']),
    ] as const,
    poolCompositionChart: [
      makeGradient(['#63f8b3', '#dcff9c']),
      makeGradient(['#e323ff', '#7517f8']),
      makeGradient(['#639ff8', '#85f9e1']),
      makeGradient(['#7d40ff', '#02a4ff']),
      makeGradient(['#f985f5', '#f863dd']),
    ] as const,
    progressChart: makeGradient(['#7d40ff', '#02a4ff']),
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
    hint: colors.charade,
    default: colors.athensGray,
    paper: colors.white,
    paperSecondary: colors.white,
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
    hint: colors.charade,
    default: colors.obsidian,
    paper: colors.foggyNight,
    paperSecondary: colors.darkBlueMagenta,
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
      h6: {
        fontSize: 16,
        fontWeight: 400,
      },
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
          textDecoration: 'underline',
          textDecorationColor: type === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',

          '&:hover': {
            textDecorationColor: 'inherit',
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
          bottom: 0,
          height: '100%',
          borderRadius: tabsHeight / 2 - tabsIndicatorSpace - tabsBorderWidth,
          zIndex: -1,
          background: 'linear-gradient(to left, #544cf2, #d93cef)',
        },

        scroller: {
          zIndex: 1,
          overflow: 'hidden',
          borderRadius: tabsHeight / 2 - tabsIndicatorSpace - tabsBorderWidth,
        },
      },

      MuiTab: {
        root: {
          minHeight: 'unset',
          padding: defaultTheme.spacing(0.2, 1.5),
          textTransform: 'unset',
          fontSize: '1rem',
          lineHeight: 1.5,
          borderRadius: tabsHeight / 2 - tabsIndicatorSpace - tabsBorderWidth,

          '&$selected': {
            color: colors.white,
          },
        },
      },

      MuiSvgIcon: {
        root: {
          display: 'block',
          fontSize: '1.25rem',
        },

        fontSizeSmall: {
          fontSize: '1rem',
        },

        fontSizeLarge: {
          fontSize: '1.5rem',
        },
      },

      // TODO: enable @material-ui/lab overrides
      // @ts-ignore
      MuiTabPanel: {
        root: {
          padding: 0,
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
    paperSecondary: string;
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
