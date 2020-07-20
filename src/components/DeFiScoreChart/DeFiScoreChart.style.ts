import { makeStyles } from 'utils/styles';

export const CHART_WIDTH = 180;
const CHART_HEIGHT = 138;

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    label: {
      fontSize: 12,
      lineHeight: 1,
      opacity: 0.5,
    },
    chart: {
      width: CHART_WIDTH,
      height: CHART_HEIGHT,
      overflow: 'hidden',
    },
    title: {
      lineHeight: 1.15,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    score: {
      width: '100%',
      fontSize: 32,
      lineHeight: 1.2,
      fontWeight: 300,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  { name: 'DeFiScoreChart' },
);
