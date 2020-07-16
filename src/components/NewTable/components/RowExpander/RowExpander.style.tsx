import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '58px',
      height: '30px',
      borderRadius: '23px',
      backgroundColor: theme.colors.blackRussian,
    },

    expanded: {
      transform: 'rotate(180deg)',
      backgroundColor: theme.colors.grayishNavy,
    },
  };
});
