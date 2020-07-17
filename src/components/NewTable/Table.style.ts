import { makeStyles } from 'utils/styles';

const firstCellStyle = {
  paddingLeft: '50px',
};

const lastCellStyle = {
  paddingRight: '50px',
};

const headStyle = {
  textAlign: 'left',
};

const crossRowBorder = '1px solid rgba(255, 255, 255, 0.1)';

export const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '100%',
      borderSpacing: 0,

      '& th': headStyle,

      '& thead th': {
        paddingBottom: 0,
      },

      '& td:first-child': firstCellStyle,
      '& th:first-child': firstCellStyle,

      '& td:first-child:last-child': {
        padding: 0,
      },

      '& th:last-child': lastCellStyle,

      '& td:last-child': {
        ...lastCellStyle,
        paddingRight: '50px',
      },

      '& tbody td': {
        fontWeight: 300,
      },

      '& td': {
        padding: 0,
      },

      '& th:first-child $title': {
        marginLeft: 10,
        paddingRight: 10,
      },

      '& tr:not($subtableRow) + $subtableRow $cellContent': {
        marginTop: 20,
      },

    },

    title: {
      height: 40,
      borderBottom: crossRowBorder,
    },

    subtableRow: {
      backgroundColor: theme.colors.jaguar,
    },

    lastSubtableRow: {
      '& $cellContent': {
        marginBottom: 20,
      }
    },

    cellContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '8px',
      height: 48,
    },

    singleCellExpandedArea: {
      paddingLeft: 58,
      paddingRight: 58,
      backgroundColor: theme.colors.jaguar,
    },

    summary: {
      marginTop: 30,
      padding: '10px 58px',
    },

    rowBeforeSummary: {
      '& $cellContent': {
        borderBottom: crossRowBorder,
      },

      '& td:first-child $cellContent': {
        paddingLeft: 0,
        marginLeft: 10,
      },
    },
  };
});
