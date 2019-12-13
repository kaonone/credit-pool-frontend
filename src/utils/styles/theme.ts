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

export { Theme };

const defaultTheme = createMuiTheme();

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.purpleHeart,
      light: colors.heliotrope,
      dark: colors.royalPurple,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.white,
      light: colors.white,
      dark: colors.white,
      contrastText: colors.royalPurple,
    },
  },
  overrides: {
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
          backgroundColor: colors.alabaster,
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
  },
});

export const gradients = {
  purple: 'linear-gradient(360deg, #7357D2 0%, #8E41DC 100%)',
};
