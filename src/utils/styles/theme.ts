import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { getTheme as createTheme, makeGradient, colors } from '@akropolis-web/styles';
import '@akropolis-web/styles/assets/fonts/HelveticaNeue/stylesheet.css';

export { Theme };

const defaultTheme = createMuiTheme();

function getGradients(type: 'dark' | 'light') {
  return {
    spartaIcon: makeGradient(
      type === 'dark'
        ? [colors.northWesternPurple, colors.darkPurple]
        : [colors.lilac, colors.iris],
    ),
    spartaText: makeGradient([colors.blueViolet, colors.lavenderBlue]),
    linearChart: [
      makeGradient(['#fc87e2', '#f24cb6']),
      makeGradient(['#63afdd', '#574cf2']),
      makeGradient(['#c43ff0', '#574cf2']),
    ] as const,
  };
}

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

function getTheme(type: 'light' | 'dark'): Theme {
  const tabsHeight = 36;
  const tabsIndicatorSpace = 3;
  const tabsBorderWidth = 1;

  return createTheme(type, {
    // TODO: Package theme options are not merged with ThemeOptionsOverrides properly. Fix this TS issue in @akropolis-web/styles
    gradients: getGradients(type) as any,
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
    overrides: {
      // TODO: remove Tabs overrides after importing Tabs from @akropolis-web/components
      MuiTabs: {
        root: {
          position: 'relative',
          display: 'inline-flex',
          overflow: 'hidden',
          minHeight: tabsHeight,
          borderRadius: tabsHeight / 2,
          padding: tabsIndicatorSpace,
          background: 'linear-gradient(to left, #544cf2, #d93cef)',

          '&::before': {
            content: "''",
            position: 'absolute',
            top: 1,
            left: 1,
            right: 1,
            bottom: 1,
            borderRadius: tabsHeight / 2,
            background: colors.foggyNight,
          },
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

        flexContainer: {
          height: '100%',
        },
      },

      MuiTab: {
        root: {
          position: 'relative',
          overflow: 'visible',
          minHeight: 'unset',
          padding: defaultTheme.spacing(0.2, 1.5),
          textTransform: 'unset',
          fontSize: '1rem',
          fontWeight: 300,
          lineHeight: 1.5,
          borderRadius: tabsHeight / 2 - tabsIndicatorSpace - tabsBorderWidth,

          '&::after': {
            content: "''",
            position: 'absolute',
            left: 0,
            width: 1,
            top: 3,
            bottom: 3,
            background: 'currentColor',
            opacity: 0,
            transition: defaultTheme.transitions.create('opacity'),
          },

          '&:not($selected)': {
            '& + &::after': {
              opacity: 0.2,
            },
          },

          '&$selected': {
            color: colors.white,
          },
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

declare module '@akropolis-web/styles/dist/theme' {
  interface ThemeOverrides {
    gradients: ReturnType<typeof getGradients>;
  }

  interface ThemeOptionsOverrides {
    gradients: ReturnType<typeof getGradients>;
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
