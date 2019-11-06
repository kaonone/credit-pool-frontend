import { Theme, colors, makeStyles } from 'utils/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      position: 'relative',
    },
    overlay: {
      color: colors.silver,
    },
    progress: {
      color: theme.palette.primary.main,
      position: 'absolute',
      left: 0,
    },
  };
});
