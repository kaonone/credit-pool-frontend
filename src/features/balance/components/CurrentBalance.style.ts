import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
    },
    balance: {
      '& + &': {
        marginLeft: 32,
      },
    },
    sum: {
      fontSize: 22,
      fontWeight: 300,
      whiteSpace: 'nowrap',
    },
    label: {
      fontSize: 12,
      fontWeight: 300,
      marginTop: 6,

      '&:before': {
        content: "''",
        display: 'inline-block',
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        marginRight: 9,
      },
    },
    labelText: {
      color: theme.palette.text.primary,
    },
  }),
  { name: 'CurrentBalance' },
);
