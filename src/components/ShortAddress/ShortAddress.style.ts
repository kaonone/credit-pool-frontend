import { makeStyles, rgba } from 'utils/styles';

export const useStyles = makeStyles(theme => {
  return {
    shortAddress: {
      fontSize: 'inherit',
      color: 'inherit',
    },
    tooltip: {
      cursor: 'pointer',
      borderBottom: `1px dashed ${rgba(theme.palette.text.primary, 0.5)}`,
    },
  };
});
