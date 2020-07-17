import { makeStyles } from 'utils/styles';

export const switchButtonsHeight = 20;

export const useStyles = makeStyles(
  theme => ({
    root: {
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
      userSelect: 'none',

      '& + &': {
        marginLeft: 5,
        marginRight: 5,
      },
    },

    switchButtonSelected: {
      background:
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    },

    switchButtonInCaps: {
      textTransform: 'uppercase',
    },
  }),
  { name: 'PeriodSwitch' },
);
