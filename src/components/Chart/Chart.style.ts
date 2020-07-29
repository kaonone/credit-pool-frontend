import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    tick: {
      fill: theme.palette.text.primary,
      fontSize: 10,
      fontWeight: 300,
      opacity: 0.5,
    },
  }),
  { name: 'Chart' },
);
