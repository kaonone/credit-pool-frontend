import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
    },

    tooltip: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: -22,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
  { name: 'LabelWithInfoTooltip' },
);
