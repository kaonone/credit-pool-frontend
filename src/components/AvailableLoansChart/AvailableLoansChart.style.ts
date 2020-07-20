import { makeStyles } from 'utils/styles';

export const CHART_WIDTH = 255;
const CHART_HEIGHT = 155;

export const useStyles = makeStyles(
  () => ({
    root: {
      width: CHART_WIDTH,
      height: CHART_HEIGHT,
      overflow: 'hidden',
    },
    label: {
      lineHeight: 1.15,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    title: {
      maxWidth: 120,
    },
    sum: {
      fontSize: 32,
      lineHeight: 1.2,
      fontWeight: 300,
    },
    percentage: {
      marginTop: 2,
      fontWeight: 300,
    },
  }),
  { name: 'AvailableLoansChart' },
);
