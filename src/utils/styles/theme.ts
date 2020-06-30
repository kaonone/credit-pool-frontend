// eslint-disable-next-line no-restricted-imports
import type { PaletteType } from '@material-ui/core';
import { createMuiTheme, Theme, lighten, darken } from '@material-ui/core/styles';

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
import { generateGridSpacingOverrides } from './generateGridSpacingOverrides';
import { makeGradient } from './makeGradient';

export { Theme };

const gradients = {
  main: makeGradient([
    {
      color: colors.trueV,
      offset: '0%',
    },
    {
      color: colors.mediumPurple,
      offset: '100%',
    },
  ]),
};

const defaultTheme = createMuiTheme();

export const lightTheme: Theme = getTheme('light');
export const darkTheme: Theme = getTheme('dark');

function getTheme(type: PaletteType) {
  return createMuiTheme({
    gradients,
    colors,
    palette: {
      type,
      primary: {
        main: type === 'dark' ? lighten(colors.purpleHeart, 0.2) : colors.purpleHeart,
        light: type === 'dark' ? lighten(colors.heliotrope, 0.2) : colors.heliotrope,
        dark: type === 'dark' ? lighten(colors.royalPurple, 0.2) : colors.royalPurple,
        contrastText: colors.white,
      },
      secondary: {
        main: colors.white,
        light: colors.white,
        dark: colors.white,
        contrastText: colors.royalPurple,
      },
      background: {
        default: type === 'dark' ? colors.charade : colors.alabaster,
        paper: type === 'dark' ? colors.scarpaFlow : colors.white,
        hint: type === 'dark' ? colors.scarpaFlow : colors.whiteLilac,
        tableHeader: type === 'dark' ? lighten(colors.scarpaFlow, 0.2) : darken(colors.white, 0.07),
      },
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
    },
  });
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: typeof colors;
    gradients: typeof gradients;
  }

  interface ThemeOptions {
    colors: typeof colors;
    gradients: typeof gradients;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    hint: string;
    tableHeader: string;
  }
}
