import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '100%',
      borderSpacing: 0,

      '& thead td': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '16px',
      },

      '& td:first-child': {
        paddingLeft: '50px',
      },

      '& td:last-child': {
        paddingRight: '50px',
      },

      '& td': {
        padding: '20px 0',
      },

      '& tbody td': {
        fontWeight: 300,
      },
    },

    expandedArea: {
      backgroundColor: theme.colors.jaguar,
    },
  }
});
