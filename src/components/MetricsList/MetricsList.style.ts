import { colors, makeStyles } from 'utils/styles';

export const useStyles = makeStyles(() => {
  return {
    divider: {
      backgroundColor: colors.heliotrope,
    },

    dividerItem: {
      alignSelf: 'stretch',
    },
  };
});
