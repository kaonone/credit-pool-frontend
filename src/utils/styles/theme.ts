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
        '#walletconnect-wrapper': {
          zIndex: defaultTheme.zIndex.modal,
          position: 'relative',
        },
      },
    },
  },
});
