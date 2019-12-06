import { createMuiTheme, Theme } from '@material-ui/core/styles';

import { colors } from 'utils/styles/colors';

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
        html: {
          boxSizing: 'border-box',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontSize: 16,
          fontFamily: 'OpenSans, sans-serif',
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
  },
});

export const gradients = {
  purple: 'linear-gradient(360deg, #7357D2 0%, #8E41DC 100%)',
};
