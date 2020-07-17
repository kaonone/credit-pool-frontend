import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => {
  const graphicMarginBottom = 20;
  const switchButtonsHeight = 20;
  const graphicHeight = `calc(100% - ${graphicMarginBottom}px - ${switchButtonsHeight}px)`;

  return {
    root: {
      height: '100%',
    },

    graphic: {
      height: graphicHeight,
      marginBottom: 14,
    },

    tick: {
      fill: theme.palette.text.primary,
      fontSize: 10,
      fontWeight: 300,
      opacity: 0.5,
    },

    periodSwitch: {
      display: 'flex',
    },

    switchButton: {
      minWidth: 30,
      height: switchButtonsHeight,
      border: 0,
      borderRadius: 24,
      fontSize: 12,
      color: theme.palette.text.primary,
      textTransform: 'capitalize',
      background: 'transparent',
      outline: 'none',
      cursor: 'pointer',

      '& + &': {
        marginLeft: 5,
        marginRight: 5,
      },
    },

    switchButtonSelected: {
      background: 'rgba(255, 255, 255, 0.1)',
    },

    switchButtonInCaps: {
      textTransform: 'uppercase',
    },
  };
});
