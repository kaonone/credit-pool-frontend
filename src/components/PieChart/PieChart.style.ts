import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    legend: {
      marginLeft: 23,
      padding: 0,
      listStyle: 'none',
      fontSize: 13,
      fontWeight: 300,
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.primary.main,

      '&:before': {
        content: "''",
        width: 10,
        height: 10,
        marginRight: 10,
        flexShrink: 0,
        borderRadius: '50%',
        background: 'currentColor',
      },
    },
    label: {
      color: theme.palette.text.primary,
    },
  }),
  { name: 'PieChart' },
);
