import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(() => {
  return {
    divider: {
      backgroundColor: 'currentColor',
      opacity: 0.2,
    },

    dividerItem: {
      alignSelf: 'stretch',
    },
  };
});
