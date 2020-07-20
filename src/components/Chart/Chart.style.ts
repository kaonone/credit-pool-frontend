import { makeStyles } from 'utils/styles';

import { switchButtonsHeight } from './components/PeriodSwitch/PeriodSwitch.style';

export const useStyles = makeStyles(
  theme => {
    const graphicMarginBottom = 20;
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
    };
  },
  { name: 'Chart' },
);
